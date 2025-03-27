import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Room {
  id: number;
  title: string;
  image: string;
  price: number;
  bedType: string;
  capacity: number;
  size: number;
  amenities: string[];
}

export const useRoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('rooms').select('*');

        if (error) throw error;
        setRooms(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return { rooms, loading, error };
};
