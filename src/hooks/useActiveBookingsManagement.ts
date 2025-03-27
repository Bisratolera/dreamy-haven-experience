
import { useActiveBookings } from './useActiveBookings';
import { useActiveBookingFilters } from './useActiveBookingFilters';
import { useActiveBookingOperations } from './useActiveBookingOperations';
import { ActiveBooking, ActiveBookingSortConfig } from '@/types/booking.types';

// Re-export types for backward compatibility
export type { ActiveBooking, ActiveBookingSortConfig };
export { activeBookingsMock } from '@/data/activeBookingsMock';

export function useActiveBookingsManagement() {
  const { bookings, setBookings, loading, error } = useActiveBookings();
  
  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    getSortedBookings
  } = useActiveBookingFilters(bookings);
  
  const {
    viewBookingDetails
  } = useActiveBookingOperations(bookings);

  return {
    bookings,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    getSortedBookings,
    viewBookingDetails,
    loading,
    error
  };
}
