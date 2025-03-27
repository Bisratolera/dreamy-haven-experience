
import { useState } from 'react';
import { Booking, SortConfig } from '@/types/booking.types';
import { filterBookingsBySearchTerm, filterBookingsByStatus, sortBookings } from '@/utils/bookingUtils';

export function useBookingFilters(bookings: Booking[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'checkIn',
    direction: 'ascending'
  });

  // Handle sort
  const requestSort = (key: keyof Booking) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered bookings
  const getSortedBookings = () => {
    let filteredBookings = [...bookings];
    
    // Apply search
    filteredBookings = filterBookingsBySearchTerm(filteredBookings, searchTerm);
    
    // Apply status filter
    filteredBookings = filterBookingsByStatus(filteredBookings, statusFilter);
    
    // Apply sort
    filteredBookings = sortBookings(filteredBookings, sortConfig);
    
    return filteredBookings;
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortConfig,
    requestSort,
    getSortedBookings
  };
}
