import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Room } from '@/types/room.types';

export const useRoomDetails = (roomId: number) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('id, title, image_url, price, capacity, size, bed_type, amenities, description')
          .eq('id', roomId)
          .single();

        if (error) throw error;

        // Transform data to match Room type
        setRoom({
          id: data.id,
          title: data.title,
          image: data.image_url,
          price: data.price,
          capacity: data.capacity,
          size: data.size,
          bedType: data.bed_type,
          amenities: data.amenities,
          description: data.description
        });
      } catch (err) {
        console.error('Error fetching room:', err);
        setError('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  return { room, loading, error };
};
