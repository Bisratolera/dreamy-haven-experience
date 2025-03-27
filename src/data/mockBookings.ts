
import { Booking } from '@/types/booking.types';

export const mockBookings: Booking[] = [
  {
    id: 1,
    guestName: 'John Smith',
    roomName: 'Deluxe King Room',
    roomId: 1,
    checkIn: new Date('2023-09-10'),
    checkOut: new Date('2023-09-15'),
    status: 'confirmed',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    totalPrice: 995,
    adults: 2,
    children: 0,
    createdAt: '2023-08-15T00:00:00Z'
  },
  {
    id: 2,
    guestName: 'Sarah Johnson',
    roomName: 'Superior Twin Room',
    roomId: 2,
    checkIn: new Date('2023-09-20'),
    checkOut: new Date('2023-09-25'),
    status: 'pending',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    totalPrice: 1245,
    adults: 2,
    children: 1,
    createdAt: '2023-08-18T00:00:00Z'
  },
  {
    id: 3,
    guestName: 'Michael Brown',
    roomName: 'Executive Suite',
    roomId: 3,
    checkIn: new Date('2023-10-05'),
    checkOut: new Date('2023-10-10'),
    status: 'cancelled',
    email: 'mbrown@example.com',
    phone: '+1 (555) 456-7890',
    totalPrice: 1745,
    adults: 1,
    children: 0,
    createdAt: '2023-08-25T00:00:00Z'
  },
  {
    id: 4,
    guestName: 'Emily Davis',
    roomName: 'Family Suite',
    roomId: 4,
    checkIn: new Date('2023-10-15'),
    checkOut: new Date('2023-10-20'),
    status: 'confirmed',
    email: 'emily.d@example.com',
    phone: '+1 (555) 234-5678',
    totalPrice: 1995,
    adults: 2,
    children: 2,
    createdAt: '2023-09-01T00:00:00Z'
  }
];
