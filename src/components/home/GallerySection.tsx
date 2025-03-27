
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import SectionTitle from '@/components/common/SectionTitle';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    alt: 'Hotel Lobby',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
    alt: 'Luxury Room',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?q=80&w=2070&auto=format&fit=crop',
    alt: 'Hotel Pool',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1537833633404-f02da1734a14?q=80&w=2070&auto=format&fit=crop',
    alt: 'Hotel Restaurant',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1601565415267-ec94a3e95dce?q=80&w=1975&auto=format&fit=crop',
    alt: 'Hotel Spa',
  },
];

const GallerySection = () => {
  return (
    <section className="section bg-hotel-beige">
      <div className="container-custom">
        <SectionTitle
          subtitle="Photo Gallery"
          title="Explore Our Spaces"
          description="Take a visual journey through our elegant spaces and discover the beauty of Dream Hotel."
        />
        
        <div className="grid grid-cols-12 gap-4 mt-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-8 image-hover-zoom">
            <img 
              src={images[0].src} 
              alt={images[0].alt} 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 image-hover-zoom">
            <img 
              src={images[1].src} 
              alt={images[1].alt} 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 image-hover-zoom">
            <img 
              src={images[2].src} 
              alt={images[2].alt} 
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 image-hover-zoom">
            <img 
              src={images[3].src} 
              alt={images[3].alt} 
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 image-hover-zoom">
            <img 
              src={images[4].src} 
              alt={images[4].alt} 
              className="w-full h-[250px] object-cover"
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            to="/gallery" 
            variant="primary"
            icon={<ArrowRight size={16} />}
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
