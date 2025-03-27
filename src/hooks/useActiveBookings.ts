
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ActiveBooking } from '@/types/booking.types';
import { activeBookingsMock } from '@/data/activeBookingsMock';
import { calculateActiveBookingMetrics } from '@/utils/bookingUtils';

export function useActiveBookings() {
  const [bookings, setBookings] = useState<ActiveBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveBookings = async () => {
      setLoading(true);
      try {
        // Join bookings with rooms to get room names
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            rooms:room_id (title)
          `)
          .eq('status', 'confirmed');

        if (error) throw error;

        // If no data returned, use mock data
        if (!data || data.length === 0) {
          console.warn("No active bookings found. Using mock data.");
          setBookings(activeBookingsMock);
          setError("No active bookings found. Using mock data.");
          setLoading(false);
          return;
        }

        // Transform the data to match our ActiveBooking interface
        const transformedData: ActiveBooking[] = data.map(booking => {
          const { nightsStayed, remainingNights } = calculateActiveBookingMetrics(
            new Date(booking.check_in),
            new Date(booking.check_out)
          );
          
          return {
            id: booking.id,
            guestName: booking.guest_name,
            roomName: booking.rooms?.title || 'Unknown Room',
            roomId: booking.room_id,
            checkIn: new Date(booking.check_in),
            checkOut: new Date(booking.check_out),
            status: booking.status as 'confirmed',
            email: booking.email,
            phone: booking.phone,
            totalPrice: booking.total_price,
            adults: booking.adults,
            children: booking.children,
            specialRequests: booking.special_requests,
            nightsStayed,
            remainingNights,
            createdAt: booking.created_at
          };
        });

        setBookings(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching active bookings:', err);
        setError('Failed to load active bookings. Using fallback data.');
        setBookings(activeBookingsMock);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBookings();
  }, []);

  return { bookings, setBookings, loading, error };
}
