
import React from 'react';
import { Users, Maximize2, Wifi, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Button from '@/components/common/Button';

interface RoomCardProps {
  room: {
    id: number;
    title: string;
    image: string;
    price: number;
    shortDescription: string;
    amenities: string[];
    size: string;
    capacity: string;
  };
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, className }) => {
  return (
    <div 
      className={cn(
        "bg-white shadow-elegant group hover:shadow-card transition-all duration-500",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <Link to={`/rooms/${room.id}`}>
          <img 
            src={room.image} 
            alt={room.title} 
            className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-4 right-4 bg-hotel-gold/90 backdrop-blur-sm text-white py-1 px-3">
          <span className="font-serif text-lg">${room.price}</span> / night
        </div>
      </div>
      
      <div className="p-6">
        <Link to={`/rooms/${room.id}`}>
          <h3 className="font-serif text-2xl mb-3 text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300">
            {room.title}
          </h3>
        </Link>
        
        <p className="text-hotel-stone mb-5 line-clamp-2">
          {room.shortDescription}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center">
            <Maximize2 size={18} className="text-hotel-gold mr-2" />
            <span className="text-sm text-hotel-stone">{room.size}</span>
          </div>
          <div className="flex items-center">
            <Users size={18} className="text-hotel-gold mr-2" />
            <span className="text-sm text-hotel-stone">{room.capacity}</span>
          </div>
        </div>
        
        <div className="border-t border-hotel-sand pt-5 flex justify-between items-center">
          <div className="flex space-x-3">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="text-xs bg-hotel-beige py-1 px-2 text-hotel-stone"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs bg-hotel-beige py-1 px-2 text-hotel-stone">
                +{room.amenities.length - 3}
              </span>
            )}
          </div>
          
          <Button 
            to={`/rooms/${room.id}`} 
            variant="text"
            icon={<ArrowRight size={16} />}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
