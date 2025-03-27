import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/types/booking.types';
import { transformSupabaseBooking } from '@/utils/bookingUtils';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Fetch bookings directly from the database
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            rooms:room_id (title)
          `);

        if (error) throw error;

        // If no bookings are found, log and return
        if (!data || data.length === 0) {
          setBookings([]);
          setError("No bookings found.");
          return;
        }

        // Transform the data to match our Booking interface
        const transformedData: Booking[] = data.map(booking => 
          transformSupabaseBooking(booking, booking.rooms?.title || 'Unknown Room')
        );

        setBookings(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, setBookings, loading, error };
}
