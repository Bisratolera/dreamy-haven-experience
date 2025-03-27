
import { useState } from 'react';
import { ActiveBooking, ActiveBookingSortConfig } from '@/types/booking.types';

export function useActiveBookingFilters(bookings: ActiveBooking[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<ActiveBookingSortConfig>({
    key: 'checkIn',
    direction: 'ascending'
  });

  // Handle sort
  const requestSort = (key: keyof ActiveBooking) => {
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
    if (searchTerm) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm)
      );
    }
    
    // Apply sort
    if (sortConfig.key) {
      filteredBookings.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredBookings;
  };

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    getSortedBookings
  };
}
