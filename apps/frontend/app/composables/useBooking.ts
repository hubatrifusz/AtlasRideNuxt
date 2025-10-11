import { CalendarDate } from '@internationalized/date';

export function useBooking() {
  function calendarDateToISO(cd: CalendarDate | null): string | null {
    return cd instanceof CalendarDate ? cd.toString() : null;
  }

  const postNewBooking = async (form: any) => {
    try {
      const rawForm = toRaw(form);

      const payload = {
        ...rawForm,
        departureDate: calendarDateToISO(rawForm.departureDate),
        returnDate: calendarDateToISO(rawForm.returnDate),
      };

      const response = await $fetch('https://backend-516266244601.europe-central2.run.app/api', {
        method: 'POST',
        body: payload,
      });

      return response;
    } catch (error) {
      console.error('Error posting new booking:', error);
      throw error;
    }
  };

  const getAllBooking = async () => {
    const response = await fetch(`https://backend-516266244601.europe-central2.run.app/api`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return response.json();
  };

  return {
    postNewBooking,
    getAllBooking,
  };
}
