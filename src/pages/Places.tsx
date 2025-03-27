
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { MapPin, Clock, Star } from 'lucide-react';

const placesData = [
  {
    id: 1,
    title: 'Historic City Center',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=2070&auto=format&fit=crop',
    distance: '0.5 miles',
    rating: 4.8,
    description: 'Explore the charming historic district with cobblestone streets, artisan shops, and cultural landmarks dating back to the 18th century.',
    duration: '3-4 hours'
  },
  {
    id: 2,
    title: 'Coastal Nature Reserve',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2074&auto=format&fit=crop',
    distance: '3 miles',
    rating: 4.9,
    description: 'Experience the breathtaking natural beauty of protected coastal wetlands, home to diverse wildlife and scenic walking trails along the shoreline.',
    duration: 'Half day'
  },
  {
    id: 3,
    title: 'Cultural Arts Museum',
    image: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?q=80&w=2070&auto=format&fit=crop',
    distance: '1.2 miles',
    rating: 4.7,
    description: 'Immerse yourself in the region\'s rich cultural heritage with exhibits featuring local and international artists, interactive displays, and regular special exhibitions.',
    duration: '2-3 hours'
  },
  {
    id: 4,
    title: 'Botanical Gardens',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop',
    distance: '2.5 miles',
    rating: 4.6,
    description: 'Wander through meticulously landscaped gardens featuring exotic plants, themed sections, and seasonal flower displays in a tranquil setting.',
    duration: '2 hours'
  },
  {
    id: 5,
    title: 'Vineyard and Winery Tour',
    image: 'https://images.unsplash.com/photo-1559588501-59a188c80efc?q=80&w=2071&auto=format&fit=crop',
    distance: '8 miles',
    rating: 4.9,
    description: 'Tour the region\'s premier winery and vineyard, learning about the wine-making process while enjoying tastings of award-winning varieties.',
    duration: '4 hours'
  },
  {
    id: 6,
    title: 'Mountain Viewpoint',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop',
    distance: '12 miles',
    rating: 4.8,
    description: 'Hike to this spectacular viewpoint offering panoramic vistas of the surrounding mountains, valleys, and coastline - perfect for sunrise or sunset visits.',
    duration: 'Full day'
  }
];

const Places = () => {
  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="EXPLORE"
            title="Discover Nearby Attractions"
            description="Experience the best local attractions and hidden gems within easy reach of Dream Hotel, curated by our concierge team to enhance your stay."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placesData.map((place) => (
            <Card key={place.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-hotel-charcoal px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <MapPin size={14} className="mr-1 text-hotel-gold" />
                  {place.distance}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-hotel-charcoal">{place.title}</h3>
                  <div className="flex items-center text-sm">
                    <Star size={16} className="text-hotel-gold mr-1" />
                    <span>{place.rating}</span>
                  </div>
                </div>
                
                <p className="text-hotel-stone mb-4 text-sm">
                  {place.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-hotel-stone">
                    <Clock size={16} className="mr-1" />
                    <span>{place.duration}</span>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View Details
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

export default Places;
