
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import SectionTitle from '@/components/common/SectionTitle';

const AboutSection = () => {
  return (
    <section className="section bg-hotel-beige overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle
              subtitle="About Us"
              title="A Legacy of Luxury & Exceptional Service"
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-hotel-stone">
              <p>
                Dream Hotel is the epitome of refined luxury, offering an unparalleled guest experience in the heart of an iconic destination. Our commitment to excellence is reflected in every detail, from our meticulously designed spaces to our attentive service.
              </p>
              <p>
                Founded on the principles of exceptional hospitality, we take pride in creating memorable moments for our guests. Each room is a sanctuary of comfort, each meal a culinary journey, and each service tailored to exceed expectations.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-serif text-4xl text-hotel-gold mb-2">50+</h4>
                  <p className="text-hotel-stone">Luxury Rooms</p>
                </div>
                <div>
                  <h4 className="font-serif text-4xl text-hotel-gold mb-2">15+</h4>
                  <p className="text-hotel-stone">Years of Excellence</p>
                </div>
                <div>
                  <h4 className="font-serif text-4xl text-hotel-gold mb-2">5⭐</h4>
                  <p className="text-hotel-stone">Customer Rating</p>
                </div>
                <div>
                  <h4 className="font-serif text-4xl text-hotel-gold mb-2">24/7</h4>
                  <p className="text-hotel-stone">Customer Support</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                to="/about" 
                variant="primary"
                icon={<ArrowRight size={16} />}
              >
                Discover Our Story
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-sm overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" 
                alt="Dream Hotel Lobby" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-sm overflow-hidden shadow-card z-20 hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1642957324331-d05c90190858?q=80&w=1974&auto=format&fit=crop" 
                alt="Dream Hotel Restaurant" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-hotel-gold z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-hotel-gold z-0 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
