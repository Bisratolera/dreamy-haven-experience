
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { Calendar, Tag, Clock } from 'lucide-react';

const offerData = [
  {
    id: 1,
    title: 'Weekend Escape Package',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
    discount: '25% Off',
    validUntil: 'December 31, 2025',
    description: 'Enjoy a luxurious weekend getaway with 25% off our best available rates, complimentary breakfast, and late checkout until 2 PM.',
    code: 'WEEKEND25'
  },
  {
    id: 2,
    title: 'Romantic Retreat',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    discount: '20% Off',
    validUntil: 'February 28, 2026',
    description: 'Create unforgettable moments with our romantic package including champagne upon arrival, rose petal turndown service, and a couples spa treatment.',
    code: 'ROMANCE20'
  },
  {
    id: 3,
    title: 'Family Fun Package',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    discount: '15% Off',
    validUntil: 'August 31, 2025',
    description: 'Perfect for families! Enjoy interconnecting rooms, complimentary meals for children under 12, and access to our kids club activities.',
    code: 'FAMILY15'
  },
  {
    id: 4,
    title: 'Extended Stay Offer',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
    discount: '30% Off',
    validUntil: 'October 31, 2025',
    description: 'Stay longer and save more! Enjoy 30% off when you book 5 nights or more, with daily breakfast and complimentary airport transfers.',
    code: 'EXTENDED30'
  }
];

const Offers = () => {
  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="SPECIAL DEALS"
            title="Exclusive Offers"
            description="Take advantage of our limited-time special offers and packages designed to make your stay even more memorable and valuable."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerData.map((offer) => (
            <Card key={offer.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-full min-h-60">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-hotel-gold text-white px-4 py-2 rounded-sm">
                    {offer.discount}
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-hotel-charcoal mb-3">{offer.title}</h3>
                    
                    <p className="text-hotel-stone mb-4 text-sm">
                      {offer.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-hotel-stone">
                        <Calendar size={16} className="mr-2 text-hotel-gold" />
                        <span>Valid until: {offer.validUntil}</span>
                      </div>
                      <div className="flex items-center text-sm text-hotel-stone">
                        <Tag size={16} className="mr-2 text-hotel-gold" />
                        <span>Promo code: <span className="font-medium">{offer.code}</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    to="/rooms" 
                    variant="primary"
                    className="w-full"
                  >
                    Book This Offer
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Offers;
