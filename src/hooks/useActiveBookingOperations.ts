import { ActiveBooking } from '@/types/booking.types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useActiveBookingOperations(bookings: ActiveBooking[]) {
  const { user } = useAuth();
  
  // View booking details
  const viewBookingDetails = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      console.log(booking);
      return booking;
    }
    return null;
  };

  // Check-out a guest
  const checkoutGuest = async (id: number) => {
    try {
      const booking = bookings.find(b => b.id === id);
      if (!booking) {
        toast.error('Booking not found');
        return false;
      }
      
      // Update the booking in Supabase
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          check_out: new Date().toISOString().split('T')[0] // Today's date for early checkout
        })
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success(`${booking.guestName} has been checked out successfully`);
      return true;
    } catch (error) {
      console.error('Error checking out guest:', error);
      toast.error('Failed to check out guest');
      return false;
    }
  };

  // Extend a booking
  const extendBooking = async (id: number, additionalDays: number) => {
    try {
      const booking = bookings.find(b => b.id === id);
      if (!booking) {
        toast.error('Booking not found');
        return false;
      }
      
      // Calculate new check-out date
      const newCheckOut = new Date(booking.checkOut);
      newCheckOut.setDate(newCheckOut.getDate() + additionalDays);
      
      // Calculate additional price
      const pricePerNight = booking.totalPrice / 
        (Math.floor((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)));
      const newTotalPrice = booking.totalPrice + (pricePerNight * additionalDays);
      
      // Update the booking in Supabase
      const { error } = await supabase
        .from('bookings')
        .update({
          check_out: newCheckOut.toISOString().split('T')[0],
          total_price: newTotalPrice
        })
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success(`Booking for ${booking.guestName} extended by ${additionalDays} days`);
      return true;
    } catch (error) {
      console.error('Error extending booking:', error);
      toast.error('Failed to extend booking');
      return false;
    }
  };

  // Add a new method to get all bookings for the current user
  const getUserBookings = async () => {
    if (!user) {
      toast.error('User not logged in');
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          rooms:room_id (title)
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return [];
      }
      
      return data.map(booking => ({
        id: booking.id,
        roomId: booking.room_id,
        roomName: booking.rooms?.title || 'Unknown Room',
        guestName: booking.guest_name,
        email: booking.email,
        phone: booking.phone,
        checkIn: new Date(booking.check_in),
        checkOut: new Date(booking.check_out),
        adults: booking.adults,
        children: booking.children,
        specialRequests: booking.special_requests,
        totalPrice: booking.total_price,
        nightsStayed: 0, // This would need to be calculated
        remainingNights: 0 // This would need to be calculated
      }));
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      toast.error('Failed to fetch your bookings');
      return [];
    }
  };

  return {
    viewBookingDetails,
    checkoutGuest,
    extendBooking,
    getUserBookings
  };
}
