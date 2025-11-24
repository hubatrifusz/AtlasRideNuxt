const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.rackhost.hu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends booking confirmation emails
 * @param {Object} booking - The booking object from MongoDB
 */
async function sendBookingEmail(booking) {
  // Customer email
  const customerEmailData = {
    to: booking.email,
    subject: "Atlas Ride ajánlatkérés visszaigazolás",
    html: `<div>
      <h2>Ajánlatkérés megerősítése – Köszönjük, hogy minket választott!</h2>
      <p>Kedves ${booking.name}!</p>
      <p>Örömmel értesítjük, hogy az ajánlatkérése sikeresen rögzítésre került. Az alábbiakban találja a részleteket:</p>
      <p><strong>Az ajánlatkérés adatai:</strong></p>
      <ul>
          <li><strong>Indulás időpontja:</strong> ${new Date(
            booking.departureDate
          ).toLocaleDateString("hu-HU")}, ${booking.departureTime}</li>
          <li><strong>Indulási hely:</strong> ${booking.departureLocation}</li>
          <li><strong>Célállomás:</strong> ${booking.destinationLocation}</li>
      </ul>
      <p>Bármilyen kérdés esetén: <b>info@atlasride.hu</b> vagy <b>+36 70 600 5522</b></p>
      <p>Üdvözlettel,<br>Atlas Ride</p>
    </div>`,
  };

  // Admin email
  const fields = [
    ["Utazás típusa", booking.rideType],
    ["Név", booking.name],
    ["Cégnév", booking.companyName],
    ["Email cím", booking.email],
    ["Telefonszám", booking.phone],
    ["Utasok száma", booking.passengers],
    ["Lakcím", booking.homeAddress],
    ["Indulási hely", booking.departureLocation],
    [
      "Indulási dátum",
      booking.departureDate
        ? new Date(booking.departureDate).toLocaleDateString("hu-HU")
        : "",
    ],
    ["Indulási időpont", booking.departureTime],
    ["Célállomás", booking.destinationLocation],
    ["Felszállás időpont", booking.takeoffTime],
    ["Járatszám", booking.flightNumber],
    ["Visszaút", booking.return ? "Igen" : ""],
    ["Visszaút helyszíne", booking.returnLocation],
    [
      "Visszaút dátuma",
      booking.returnDate
        ? new Date(booking.returnDate).toLocaleDateString("hu-HU")
        : "",
    ],
    ["Visszaút időpontja", booking.returnTime],
    ["Megjegyzés", booking.comment],
  ];

  const listItems = fields
    .filter(([_, value]) => value && value !== "") // only keep non-empty
    .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
    .join("");

  const adminEmailData = {
    to: "info@atlasride.hu",
    subject: `Új ajánlatkérés - ${booking.name}`,
    html: `
    <p>Új ajánlatkérés érkezett, az alábbi adatokkal:</p>
    <p><strong>Ajánlatkérés adatai:</strong></p>
    <ul>
      ${listItems}
    </ul>
  `,
  };

  // Send both emails concurrently
  await Promise.all([
    transporter.sendMail({
      from: '"Atlas Ride" <info@atlasride.hu>',
      to: customerEmailData.to,
      subject: customerEmailData.subject,
      html: customerEmailData.html,
    }),
    transporter.sendMail({
      from: '"Atlas Ride" <info@atlasride.hu>',
      to: adminEmailData.to,
      subject: adminEmailData.subject,
      html: adminEmailData.html,
    }),
  ]);
}

module.exports = sendBookingEmail;
