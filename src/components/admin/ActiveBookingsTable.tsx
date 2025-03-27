
import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowUpDown, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { ActiveBooking, ActiveBookingSortConfig } from '@/types/booking.types';

interface ActiveBookingsTableProps {
  bookings: ActiveBooking[];
  sortConfig: ActiveBookingSortConfig;
  requestSort: (key: keyof ActiveBooking) => void;
  viewBookingDetails: (id: number) => void;
}

const ActiveBookingsTable: React.FC<ActiveBookingsTableProps> = ({
  bookings,
  sortConfig,
  requestSort,
  viewBookingDetails
}) => {
  const handleViewDetails = (id: number) => {
    viewBookingDetails(id);
    toast.info(`Viewing details for booking #${id}`);
  };

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>
              <button 
                className="flex items-center" 
                onClick={() => requestSort('guestName')}
              >
                Guest
                <ArrowUpDown size={14} className="ml-1" />
              </button>
            </TableHead>
            <TableHead>Room</TableHead>
            <TableHead>
              <button 
                className="flex items-center" 
                onClick={() => requestSort('checkIn')}
              >
                Check-in
                <ArrowUpDown size={14} className="ml-1" />
              </button>
            </TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{booking.guestName}</div>
                  <div className="text-xs text-hotel-stone">{booking.email}</div>
                </TableCell>
                <TableCell>{booking.roomName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar size={14} className="text-hotel-gold mr-1" />
                    <span>{format(booking.checkIn, 'MMM dd, yyyy')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar size={14} className="text-hotel-gold mr-1" />
                    <span>{format(booking.checkOut, 'MMM dd, yyyy')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} className="mr-1" />
                    Confirmed
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">${booking.totalPrice}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(booking.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="text-hotel-stone">No active bookings found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveBookingsTable;
