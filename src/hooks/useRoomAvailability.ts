import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRoomAvailability = (
  roomId: number | null,
  checkIn: Date,
  checkOut: Date
) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId || !checkIn || !checkOut) {
      return;
    }

    const checkAvailability = async () => {
      setLoading(true);
      
      try {
        // Format dates to ISO strings for the database query
        const checkInStr = checkIn.toISOString().split('T')[0];
        const checkOutStr = checkOut.toISOString().split('T')[0];
        
        // Query bookings that overlap with the requested dates
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('room_id', roomId)
          .neq('status', 'cancelled')
          .or(`check_in.lte.${checkOutStr},check_out.gte.${checkInStr}`);
        
        if (error) throw error;
        
        // If no overlapping bookings found, the room is available
        setIsAvailable(!data || data.length === 0);
      } catch (err) {
        console.error('Error checking availability:', err);
        setError('Failed to check availability');
        // Default to available in case of error to allow booking attempt
        setIsAvailable(true);
      } finally {
        setLoading(false);
      }
    };
    
    checkAvailability();
  }, [roomId, checkIn, checkOut]);

  return {
    isAvailable,
    loading,
    error
  };
};
