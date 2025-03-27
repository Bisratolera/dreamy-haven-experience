
import React from 'react';
import { Utensils, Wifi, Dumbbell, Coffee, Wine, Car } from 'lucide-react';
import SectionTitle from '@/components/common/SectionTitle';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 1,
    icon: <Utensils size={24} />,
    title: 'Fine Dining',
    description: 'Exquisite culinary experiences crafted by award-winning chefs.',
  },
  {
    id: 2,
    icon: <Wifi size={24} />,
    title: 'High-Speed WiFi',
    description: 'Stay connected with complimentary high-speed internet throughout the hotel.',
  },
  {
    id: 3,
    icon: <Dumbbell size={24} />,
    title: 'Fitness Center',
    description: 'State-of-the-art equipment and professional trainers available.',
  },
  {
    id: 4,
    icon: <Coffee size={24} />,
    title: 'Spa & Wellness',
    description: 'Rejuvenate your body and mind with our premium spa treatments.',
  },
  {
    id: 5,
    icon: <Wine size={24} />,
    title: 'Exclusive Bar',
    description: 'Sophisticated ambiance with a selection of fine wines and cocktails.',
  },
  {
    id: 6,
    icon: <Car size={24} />,
    title: 'Valet Parking',
    description: 'Convenient valet parking service for all hotel guests.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="section bg-hotel-beige">
      <div className="container-custom">
        <SectionTitle
          subtitle="Hotel Amenities"
          title="Experience the Finest Facilities"
          description="Discover a range of carefully curated amenities designed to enhance your stay and provide unparalleled comfort and convenience."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="bg-white p-8 shadow-elegant transition-all duration-300 hover:shadow-card group"
            >
              <div 
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 text-hotel-gold group-hover:text-white group-hover:bg-hotel-gold",
                  "border border-hotel-gold"
                )}
              >
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl mb-4 text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-hotel-stone">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
