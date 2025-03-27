
import { Booking, ActiveBooking, SortConfig } from '@/types/booking.types';

export const transformSupabaseBooking = (
  bookingData: any, 
  roomTitle: string
): Booking => {
  return {
    id: bookingData.id,
    roomId: bookingData.room_id,
    roomName: roomTitle,
    guestName: bookingData.guest_name,
    email: bookingData.email,
    phone: bookingData.phone,
    checkIn: new Date(bookingData.check_in),
    checkOut: new Date(bookingData.check_out),
    adults: bookingData.adults,
    children: bookingData.children,
    specialRequests: bookingData.special_requests,
    status: bookingData.status,
    totalPrice: bookingData.total_price,
    createdAt: bookingData.created_at,
    userId: bookingData.user_id,
    updatedAt: bookingData.updated_at,
    updatedBy: bookingData.updated_by
  };
};

export const calculateActiveBookingMetrics = (
  checkIn: Date,
  checkOut: Date
): { 
  nightsStayed: number; 
  remainingNights: number 
} => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkInDate = new Date(checkIn);
  checkInDate.setHours(0, 0, 0, 0);
  
  const checkOutDate = new Date(checkOut);
  checkOutDate.setHours(0, 0, 0, 0);
  
  // Calculate days between check-in and today
  const nightsStayed = Math.max(
    0,
    Math.floor((today.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  // Calculate days between today and check-out
  const remainingNights = Math.max(
    0,
    Math.ceil((checkOutDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  return { nightsStayed, remainingNights };
};

export const transformToActiveBooking = (booking: Booking): ActiveBooking => {
  const { nightsStayed, remainingNights } = calculateActiveBookingMetrics(
    booking.checkIn,
    booking.checkOut
  );
  
  return {
    id: booking.id,
    roomId: booking.roomId,
    roomName: booking.roomName,
    guestName: booking.guestName,
    email: booking.email,
    phone: booking.phone,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    adults: booking.adults,
    children: booking.children,
    specialRequests: booking.specialRequests,
    status: booking.status,
    totalPrice: booking.totalPrice,
    nightsStayed,
    remainingNights,
    createdAt: booking.createdAt
  };
};

// Add the missing utility functions
export const filterBookingsBySearchTerm = (bookings: Booking[], searchTerm: string): Booking[] => {
  if (!searchTerm) return bookings;
  
  const lowercasedTerm = searchTerm.toLowerCase();
  
  return bookings.filter(booking => 
    booking.guestName.toLowerCase().includes(lowercasedTerm) ||
    booking.email.toLowerCase().includes(lowercasedTerm) ||
    booking.phone.includes(lowercasedTerm)
  );
};

export const filterBookingsByStatus = (bookings: Booking[], statusFilter: string): Booking[] => {
  if (!statusFilter || statusFilter === 'all') return bookings;
  
  return bookings.filter(booking => booking.status === statusFilter);
};

export const sortBookings = (bookings: Booking[], sortConfig: SortConfig): Booking[] => {
  if (!sortConfig.key) return bookings;
  
  return [...bookings].sort((a, b) => {
    if (a[sortConfig.key!] < b[sortConfig.key!]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key!] > b[sortConfig.key!]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};
