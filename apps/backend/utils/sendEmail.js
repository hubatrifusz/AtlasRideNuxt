const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.rackhost.hu",
  port: 465,
  secure: true, // true for port 465
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
          <li><strong>Indulás időpontja:</strong> ${booking.departureDate}</li>
          <li><strong>Indulási hely:</strong> ${booking.departureLocation}</li>
          <li><strong>Célállomás:</strong> ${booking.destinationLocation}</li>
      </ul>
      <p>Bármilyen kérdés esetén: <b>info@atlasride.hu</b> vagy <b>+36 70 600 5522</b></p>
      <p>Üdvözlettel,<br>Atlas Ride</p>
    </div>`,
  };

  // Admin email
  const adminEmailData = {
    to: "info@atlasride.hu",
    subject: `Új ajánlatkérés - ${booking.name}`,
    html: `<p>Új ajánlatkérés érkezett, az alábbi adatokkal:</p>
      <p><strong>Ajánlatkérés adatai:</strong></p>
      <ul>
          <li><strong>Név:</strong> ${booking.name}</li>
          <li><strong>Email cím:</strong> ${booking.email}</li>
          <li><strong>Telefonszám:</strong> ${booking.phone}</li>
          <li><strong>Indulási hely:</strong> ${booking.departureLocation}</li>
          <li><strong>Célállomás:</strong> ${booking.destinationLocation}</li>
          <li><strong>Visszaút:</strong> ${booking.return ? "Igen" : "Nem"}</li>
          <li><strong>Időpont:</strong> ${booking.departureDate}</li>
          <li><strong>Megjegyzés:</strong> ${booking.comment || "N/A"}</li>
      </ul>`,
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
