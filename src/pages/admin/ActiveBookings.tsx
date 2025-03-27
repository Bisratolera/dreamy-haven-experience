
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { useActiveBookingsManagement } from '@/hooks/useActiveBookingsManagement';
import BookingStatsCards from '@/components/admin/BookingStatsCards';
import ActiveBookingsFilter from '@/components/admin/ActiveBookingsFilter';
import ActiveBookingsTable from '@/components/admin/ActiveBookingsTable';

const ActiveBookings = () => {
  const {
    bookings,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    getSortedBookings,
    viewBookingDetails,
    loading,
    error
  } = useActiveBookingsManagement();
  
  const filteredBookings = getSortedBookings();

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-12 mb-8">
        <div className="container-custom">
          <SectionTitle
            subtitle="ADMIN PANEL"
            title="Active Bookings"
            description="View and manage all current confirmed bookings."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <BookingStatsCards bookings={bookings} />

        <div className="bg-white p-6 rounded-md shadow-card">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <ActiveBookingsFilter 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          {loading ? (
            <div className="py-8 text-center">Loading active bookings...</div>
          ) : (
            <ActiveBookingsTable 
              bookings={filteredBookings}
              sortConfig={sortConfig}
              requestSort={requestSort}
              viewBookingDetails={viewBookingDetails}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ActiveBookings;
