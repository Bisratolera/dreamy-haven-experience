import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingInput } from '@/types/booking.types';
import { toast } from 'sonner';
import { transformSupabaseBooking } from '@/utils/bookingUtils';
import { useAuth } from '@/context/AuthContext';

export function useBookingOperations(bookings: Booking[], setBookings: React.Dispatch<React.SetStateAction<Booking[]>>) {
  const { user } = useAuth();
  
  // View booking details
  const viewBookingDetails = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      toast.info(`Viewing details for booking #${id}`);
      return booking;
    }
    return null;
  };

  // Change booking status
  const updateBookingStatus = async (id: number, status: 'confirmed' | 'cancelled') => {
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: now,
          updated_by: user?.id
        })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === id ? { ...booking, status, updatedAt: now, updatedBy: user?.id } : booking
        )
      );
      
      toast.success(`Booking #${id} has been ${status}`);
    } catch (err) {
      console.error('Error updating booking status:', err);
      toast.error('Failed to update booking status');
    }
  };

  // Create a new booking
  const createBooking = async (bookingData: BookingInput) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          room_id: bookingData.roomId,
          guest_name: bookingData.guestName,
          email: bookingData.email,
          phone: bookingData.phone,
          check_in: bookingData.checkIn.toISOString().split('T')[0],
          check_out: bookingData.checkOut.toISOString().split('T')[0],
          adults: bookingData.adults,
          children: bookingData.children,
          special_requests: bookingData.specialRequests || '',
          status: 'pending', // Default status for new bookings
          total_price: bookingData.totalPrice,
          user_id: bookingData.userId || (user ? user.id : null),
          updated_at: new Date().toISOString(),
          updated_by: user?.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('title')
        .eq('id', bookingData.roomId)
        .single();
        
      if (roomError) {
        console.error('Error fetching room name:', roomError);
        const newBooking = transformSupabaseBooking(data, 'Unknown Room');
        setBookings(prev => [...prev, newBooking]);
        toast.success('Booking created successfully!');
        return { booking: newBooking, error: null };
      }
      
      const newBooking = transformSupabaseBooking(data, roomData.title);
      setBookings(prev => [...prev, newBooking]);
      toast.success('Booking created successfully!');
      return { booking: newBooking, error: null };
    } catch (err) {
      console.error('Error creating booking:', err);
      toast.error('Failed to create booking');
      return { booking: null, error: err };
    }
  };

  return {
    viewBookingDetails,
    updateBookingStatus,
    createBooking
  };
}
