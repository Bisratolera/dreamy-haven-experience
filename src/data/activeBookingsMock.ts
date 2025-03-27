
import { ActiveBooking } from '@/types/booking.types';

export const activeBookingsMock: ActiveBooking[] = [
  {
    id: 1,
    guestName: 'John Smith',
    roomName: 'Deluxe King Room',
    roomId: 1,
    checkIn: new Date('2023-09-10'),
    checkOut: new Date('2023-09-15'),
    adults: 2,
    children: 0,
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    totalPrice: 995,
    status: 'confirmed',
    nightsStayed: 5,
    remainingNights: 0,
    createdAt: '2023-08-15T00:00:00Z'
  },
  {
    id: 4,
    guestName: 'Emily Davis',
    roomName: 'Family Suite',
    roomId: 4,
    checkIn: new Date('2023-10-15'),
    checkOut: new Date('2023-10-20'),
    adults: 2,
    children: 2,
    email: 'emily.d@example.com',
    phone: '+1 (555) 234-5678',
    totalPrice: 1995,
    status: 'confirmed',
    nightsStayed: 3,
    remainingNights: 2,
    createdAt: '2023-09-01T00:00:00Z'
  },
  {
    id: 5,
    guestName: 'Robert Johnson',
    roomName: 'Executive Suite',
    roomId: 3,
    checkIn: new Date('2023-11-05'),
    checkOut: new Date('2023-11-12'),
    adults: 1,
    children: 0,
    email: 'robert.j@example.com',
    phone: '+1 (555) 876-5432',
    totalPrice: 2443,
    status: 'confirmed',
    nightsStayed: 1,
    remainingNights: 6,
    createdAt: '2023-09-15T00:00:00Z'
  }
];
