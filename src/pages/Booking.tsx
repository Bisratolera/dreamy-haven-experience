import React, { useState, useEffect } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRoomList } from '@/hooks/useRoomList';
import { useRoomAvailability } from '@/hooks/useRoomAvailability';
import { useBookingManagement } from '@/hooks/useBookingManagement';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const bookingFormSchema = z.object({
  specialRequests: z.string().optional(),
  adults: z.string().min(1, { message: "Please select the number of adults." }),
  children: z.string(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { rooms } = useRoomList();
  const { createBooking } = useBookingManagement();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      toast.error('Please log in or sign up to book a room');
      navigate('/login', { state: { from: location.pathname + location.search } });
    }
  }, [user, navigate, location]);

  const searchParams = new URLSearchParams(location.search);
  const initialCheckIn = searchParams.get('checkIn');
  const initialCheckOut = searchParams.get('checkOut');
  const initialAdults = searchParams.get('adults') || '2';
  const initialChildren = searchParams.get('children') || '0';

  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: initialCheckIn ? new Date(initialCheckIn) : new Date(),
    to: initialCheckOut ? new Date(initialCheckOut) : addDays(new Date(), 1),
  });

  const { isAvailable } = useRoomAvailability(
    selectedRoom,
    dateRange.from,
    dateRange.to || addDays(dateRange.from, 1)
  );

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      adults: initialAdults,
      children: initialChildren,
      specialRequests: "",
    },
  });

  const calculateTotal = () => {
    if (!selectedRoom || !dateRange.from || !dateRange.to) return 0;

    const selectedRoomData = rooms.find(room => room.id === selectedRoom);
    if (!selectedRoomData) return 0;

    const nights = differenceInDays(dateRange.to, dateRange.from);
    return selectedRoomData.price * nights;
  };

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoom(roomId);
  };

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast.error("Please log in to complete your booking.");
      return;
    }

    if (!selectedRoom) {
      toast.error("Please select a room first.");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }

    if (!isAvailable) {
      toast.error("Selected room is not available for these dates.");
      return;
    }

    try {
      const totalPrice = calculateTotal();

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        toast.error("Error fetching your profile data.");
        return;
      }

      const guestName = profileData?.full_name || user.email || 'Guest';
      const phone = profileData?.phone || '';

      const { booking, error } = await createBooking({
        roomId: selectedRoom,
        guestName,
        email: user.email || '',
        phone,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        adults: parseInt(data.adults),
        children: parseInt(data.children),
        specialRequests: data.specialRequests,
        totalPrice,
        userId: user.id,
      });

      if (error) {
        throw new Error(error.message || 'Failed to create booking');
      }

      if (!booking) {
        throw new Error('Booking creation returned no data');
      }

      toast.success('Booking created successfully!');
      navigate("/booking-confirmation", {
        state: {
          bookingData: {
            ...data,
            checkIn: format(dateRange.from, 'yyyy-MM-dd'),
            checkOut: format(dateRange.to, 'yyyy-MM-dd'),
            totalPrice,
            roomId: selectedRoom,
            roomName: rooms.find(room => room.id === selectedRoom)?.title || '',
            email: user.email || '',
            phone,
            firstName: guestName.split(' ')[0], // Assuming first word is first name
            lastName: guestName.split(' ').slice(1).join(' ') || '', // Rest is last name
          },
        },
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(error.message || "Failed to create booking. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="RESERVATION"
            title="Book Your Stay"
            description="Complete the form below to reserve your room. We look forward to welcoming you to our hotel."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-serif mb-4">Select Room</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <Card
                    key={room.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden",
                      selectedRoom === room.id ? "ring-2 ring-hotel-gold" : ""
                    )}
                    onClick={() => handleRoomSelect(room.id)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg text-hotel-charcoal mb-2">{room.title}</h3>
                      <div className="flex items-center text-sm text-hotel-stone mb-2">
                        <Users size={16} className="mr-1" />
                        <span className="mr-3">Max: {room.capacity} guests</span>
                        <span>{room.size} m²</span>
                      </div>
                      <div className="text-lg font-medium text-hotel-gold">
                        ${room.price} <span className="text-sm text-hotel-stone">/ night</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-serif mb-4">Select Dates</h2>
              <div className="p-4 border border-gray-200 rounded-md bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "PPP")
                          ) : (
                            <span>Check-in Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          disabled={(date) => date < new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "PPP")
                          ) : (
                            <span>Check-out Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          disabled={(date) => date < dateRange.from || date < new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {selectedRoom && dateRange.from && dateRange.to && (
                  <div className="p-4 rounded-md bg-hotel-beige/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Room Availability:</span>
                      {isAvailable ? (
                        <span className="text-green-600 font-medium">Available</span>
                      ) : (
                        <span className="text-red-500 font-medium">Not Available</span>
                      )}
                    </div>
                    <div className="text-sm text-hotel-stone">
                      {isAvailable
                        ? "This room is available for your selected dates."
                        : "This room is not available for your selected dates. Please choose different dates or another room."}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif mb-4">Booking Details</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="p-4 mb-6 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Booked By</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white p-3 border border-gray-200 rounded-md">
                        <div className="text-sm text-gray-500 mb-1">Name</div>
                        <div className="font-medium">{user?.user_metadata?.full_name || user?.email}</div>
                      </div>
                      <div className="bg-white p-3 border border-gray-200 rounded-md">
                        <div className="text-sm text-gray-500 mb-1">Email</div>
                        <div className="font-medium">{user?.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Adults</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of adults" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Adult' : 'Adults'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Children</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of children" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[0, 1, 2, 3, 4].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Child' : 'Children'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any special requests or preferences?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedRoom && dateRange.from && dateRange.to && isAvailable && (
                    <Button type="submit" className="w-full">Complete Booking</Button>
                  )}
                </form>
              </Form>
            </div>
          </div>

          <div>
            <div className="bg-hotel-charcoal/5 p-6 rounded-md sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Booking Summary</h2>

              {selectedRoom && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Selected Room</h3>
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    {rooms.find(room => room.id === selectedRoom)?.title || ""}
                  </div>
                </div>
              )}

              {dateRange.from && dateRange.to && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Stay Dates</h3>
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-hotel-stone">Check In</div>
                        <div>{format(dateRange.from, "MMM dd, yyyy")}</div>
                      </div>
                      <div>
                        <div className="text-sm text-hotel-stone">Check Out</div>
                        <div>{format(dateRange.to, "MMM dd, yyyy")}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm border-t border-gray-100 pt-2">
                      {differenceInDays(dateRange.to, dateRange.from)} {differenceInDays(dateRange.to, dateRange.from) === 1 ? "night" : "nights"}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Details</h3>
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  {selectedRoom && dateRange.from && dateRange.to ? (
                    <>
                      <div className="flex justify-between mb-2">
                        <span>Room Rate:</span>
                        <span>${rooms.find(room => room.id === selectedRoom)?.price || 0} / night</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Number of Nights:</span>
                        <span>{differenceInDays(dateRange.to, dateRange.from)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-100">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-hotel-stone text-sm">Select a room and dates to see price details</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Payment</h3>
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <div className="flex items-center text-hotel-stone mb-2">
                    <CreditCard size={16} className="mr-2" />
                    <span>Payment will be processed at check-in</span>
                  </div>
                  <div className="text-xs text-hotel-stone">
                    A valid credit card is required to guarantee the reservation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;