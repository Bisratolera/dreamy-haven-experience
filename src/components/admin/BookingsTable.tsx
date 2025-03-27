
import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowUpDown, Calendar, Clock } from 'lucide-react';
import { Booking, SortConfig } from '@/hooks/useBookingManagement';

interface BookingsTableProps {
  bookings: Booking[];
  sortConfig: SortConfig;
  requestSort: (key: keyof Booking) => void;
  updateBookingStatus: (id: number, status: 'confirmed' | 'cancelled') => void;
  viewBookingDetails: (id: number) => void;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  sortConfig,
  requestSort,
  updateBookingStatus,
  viewBookingDetails
}) => {
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
            <TableHead>
              <button 
                className="flex items-center" 
                onClick={() => requestSort('status')}
              >
                Status
                <ArrowUpDown size={14} className="ml-1" />
              </button>
            </TableHead>
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
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                    ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {booking.status === 'confirmed' && <CheckCircle size={12} className="mr-1" />}
                    {booking.status === 'pending' && <Clock size={12} className="mr-1" />}
                    {booking.status === 'cancelled' && <XCircle size={12} className="mr-1" />}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">${booking.totalPrice}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewBookingDetails(booking.id)}
                  >
                    View
                  </Button>
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="text-hotel-stone">No bookings found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
