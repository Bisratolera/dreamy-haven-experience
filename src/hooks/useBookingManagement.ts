
import { useBookings } from './useBookings';
import { useBookingFilters } from './useBookingFilters';
import { useBookingOperations } from './useBookingOperations';
import { Booking, SortConfig } from '@/types/booking.types';

// Re-export types for backward compatibility
export type { Booking, SortConfig };
export { mockBookings } from '@/data/mockBookings';

export function useBookingManagement() {
  const { bookings, setBookings, loading, error } = useBookings();
  
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortConfig,
    requestSort,
    getSortedBookings
  } = useBookingFilters(bookings);
  
  const {
    viewBookingDetails,
    updateBookingStatus,
    createBooking
  } = useBookingOperations(bookings, setBookings);

  return {
    bookings,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortConfig,
    requestSort,
    getSortedBookings,
    updateBookingStatus,
    viewBookingDetails,
    createBooking,
    loading,
    error
  };
}
