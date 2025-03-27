
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActiveBooking } from '@/types/booking.types';

interface BookingStatsCardsProps {
  bookings: ActiveBooking[];
}

const BookingStatsCards: React.FC<BookingStatsCardsProps> = ({ bookings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground">Total Active Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{bookings.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground">Upcoming Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {bookings.filter(b => b.checkIn > new Date()).length}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatsCards;
