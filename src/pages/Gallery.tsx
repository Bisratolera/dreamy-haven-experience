
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from 'lucide-react';

// Mock gallery data
const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop',
    category: 'rooms',
    title: 'Deluxe King Room'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
    category: 'dining',
    title: 'Gourmet Restaurant'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576675784201-0e142b423952?q=80&w=2070&auto=format&fit=crop',
    category: 'spa',
    title: 'Wellness Spa'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop',
    category: 'rooms',
    title: 'Suite Bathroom'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1621275471769-e6aa44d5a483?q=80&w=2070&auto=format&fit=crop',
    category: 'amenities',
    title: 'Infinity Pool'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    category: 'rooms',
    title: 'Executive Suite'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop',
    category: 'dining',
    title: 'Breakfast Service'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    category: 'amenities',
    title: 'Hotel Bar'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=1974&auto=format&fit=crop',
    category: 'spa',
    title: 'Massage Room'
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
    category: 'dining',
    title: 'Fine Dining'
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop',
    category: 'amenities',
    title: 'Swimming Pool'
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1574691250077-03a929faece5?q=80&w=2062&auto=format&fit=crop',
    category: 'rooms',
    title: 'Family Suite'
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'rooms', name: 'Rooms & Suites' },
  { id: 'dining', name: 'Dining' },
  { id: 'spa', name: 'Spa & Wellness' },
  { id: 'amenities', name: 'Amenities' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredGallery = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <div className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-6">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Our Gallery</h1>
            <p className="text-xl">Experience the beauty and elegance of Dream Hotel through our gallery</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <SectionTitle
          subtitle="EXPLORE"
          title="Immerse Yourself in Luxury"
          description="Browse through our collection of images showcasing the exceptional spaces and experiences that await you at Dream Hotel."
        />
        
        {/* Gallery Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-hotel-gold text-white'
                  : 'bg-gray-100 text-hotel-charcoal hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div 
                  className="overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <div className="relative h-72">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="capitalize">{item.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                  <button 
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
