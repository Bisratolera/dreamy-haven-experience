import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { Bed, Users, Bath, Coffee, Wifi, Tv } from 'lucide-react';
import { useRoomList } from '@/hooks/useRoomList';

const Rooms = () => {
  const { rooms, loading, error } = useRoomList();

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="ACCOMMODATIONS"
            title="Our Luxurious Rooms"
            description="Select from our carefully designed rooms and suites, each offering a perfect blend of comfort and elegance for your stay."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-hotel-gold text-white px-4 py-2 rounded-sm">
                  ${room.price}/night
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl text-hotel-charcoal mb-4">{room.title}</h3>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-hotel-stone">
                  <div className="flex items-center gap-1">
                    <Bed size={16} />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{room.size} m²</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    to={`/rooms/${room.id}`} 
                    variant="primary"
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    to="/booking" 
                    variant="outline"
                    className="flex-1"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
