
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import SectionTitle from '@/components/common/SectionTitle';
import RoomCard from '@/components/rooms/RoomCard';

const rooms = [
  {
    id: 1,
    title: 'Deluxe Room',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    price: 299,
    shortDescription: 'Spacious comfort with premium amenities and elegant design.',
    amenities: ['King Bed', 'City View', 'Free WiFi', 'Mini Bar'],
    size: '45 m²',
    capacity: '2 Adults',
  },
  {
    id: 2,
    title: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    price: 499,
    shortDescription: 'Luxury living space with separate bedroom and stunning views.',
    amenities: ['King Bed', 'Panoramic View', 'Free WiFi', 'Living Area'],
    size: '65 m²',
    capacity: '2 Adults, 1 Child',
  },
  {
    id: 3,
    title: 'Presidential Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    price: 899,
    shortDescription: 'The ultimate luxury experience with unparalleled amenities.',
    amenities: ['King Bed', 'Panoramic View', 'Private Balcony', 'Jacuzzi'],
    size: '120 m²',
    capacity: '4 Adults',
  },
];

const RoomSection = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <SectionTitle
          subtitle="Accommodations"
          title="Rooms & Suites"
          description="Experience the perfect blend of comfort and luxury in our thoughtfully designed rooms and suites, each offering a unique atmosphere and premium amenities."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            to="/rooms" 
            variant="primary"
            icon={<ArrowRight size={16} />}
          >
            View All Rooms
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomSection;
