
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { addDays } from 'date-fns';

const BookingForm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      toast.error('Check-in date cannot be in the past');
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    
    // Navigate to booking page with search params
    navigate(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`);
  };

  // Set minimum dates for inputs
  const today = new Date().toISOString().split('T')[0];
  const minCheckOutDate = checkIn ? 
    new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : 
    addDays(new Date(), 1).toISOString().split('T')[0];

  return (
    <div className="bg-white shadow-card relative z-10 -mt-20 mx-4 lg:mx-auto max-w-6xl">
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-2xl mb-6 text-hotel-charcoal">
          Book Your Stay
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-hotel-charcoal">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    // If check-out date is before new check-in date, update it
                    if (checkOut && new Date(checkOut) <= new Date(e.target.value)) {
                      setCheckOut(new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0]);
                    }
                  }}
                  min={today}
                  required
                  className="w-full p-3 border border-hotel-sand focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold outline-none transition-all duration-300 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hotel-stone" size={18} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-hotel-charcoal">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || minCheckOutDate}
                  required
                  className="w-full p-3 border border-hotel-sand focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold outline-none transition-all duration-300 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hotel-stone" size={18} />
              </div>
            </div>
            
            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-hotel-charcoal">
                Guests
              </label>
              <div 
                className="w-full p-3 border border-hotel-sand flex items-center justify-between cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center">
                  <Users size={18} className="text-hotel-stone mr-2" />
                  <span>
                    {adults} Adults, {children} Children
                  </span>
                </div>
                <ChevronDown size={18} className="text-hotel-stone" />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-hotel-sand shadow-lg z-50 p-4 animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Adults</span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-hotel-sand flex items-center justify-center text-hotel-charcoal hover:border-hotel-gold transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAdults(Math.max(1, adults - 1));
                          }}
                        >
                          -
                        </button>
                        <span>{adults}</span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-hotel-sand flex items-center justify-center text-hotel-charcoal hover:border-hotel-gold transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAdults(Math.min(10, adults + 1));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Children</span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-hotel-sand flex items-center justify-center text-hotel-charcoal hover:border-hotel-gold transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setChildren(Math.max(0, children - 1));
                          }}
                        >
                          -
                        </button>
                        <span>{children}</span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-hotel-sand flex items-center justify-center text-hotel-charcoal hover:border-hotel-gold transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setChildren(Math.min(10, children + 1));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className="w-full text-center text-sm text-hotel-gold hover:text-hotel-charcoal transition-colors duration-300 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-end">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                Check Availability
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
