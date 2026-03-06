import { v4 as uuidv4 } from 'uuid';

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
};

export const generateBookingId = (): string => {
    return uuidv4();
};

export const isDateInThePast = (date: Date): boolean => {
    return new Date() > date;
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const calculateTimeSlotAvailability = (bookedSlots: Array<Date>, timeSlotDuration: number, start: Date, end: Date): Array<Date> => {
    const availableSlots: Array<Date> = [];
    const current = new Date(start);

    while (current < end) {
        const isBooked = bookedSlots.some(slot => slot.getTime() === current.getTime());
        if (!isBooked) {
            availableSlots.push(new Date(current));
        }
        current.setMinutes(current.getMinutes() + timeSlotDuration);
    }

    return availableSlots;
};