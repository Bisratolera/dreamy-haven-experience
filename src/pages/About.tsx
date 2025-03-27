
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Phone, Star } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-6">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">About Our Hotel</h1>
            <p className="text-xl md:text-2xl">Providing exceptional luxury and comfort since 1985</p>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              subtitle="OUR STORY"
              title="A Legacy of Luxury"
              description="Dream Hotel has been redefining luxury hospitality for over three decades, combining timeless elegance with modern comfort to create unforgettable experiences for our guests."
              align="left"
            />
            
            <p className="text-hotel-stone mb-6">
              Founded in 1985 by renowned hotelier Jonathan Clarke, Dream Hotel began as a boutique establishment with just 15 rooms. Today, we've grown into a premier luxury destination while maintaining our commitment to personalized service and attention to detail.
            </p>
            
            <p className="text-hotel-stone mb-6">
              Our philosophy centers on creating a sanctuary where guests can escape the ordinary and immerse themselves in extraordinary comfort and service. Every aspect of your stay is carefully curated to ensure an experience that exceeds expectations.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <div className="font-serif text-5xl text-hotel-gold mb-2">30+</div>
                <div className="text-hotel-charcoal">Years of Excellence</div>
              </div>
              <div>
                <div className="font-serif text-5xl text-hotel-gold mb-2">150</div>
                <div className="text-hotel-charcoal">Luxury Rooms</div>
              </div>
              <div>
                <div className="font-serif text-5xl text-hotel-gold mb-2">3</div>
                <div className="text-hotel-charcoal">Gourmet Restaurants</div>
              </div>
              <div>
                <div className="font-serif text-5xl text-hotel-gold mb-2">24/7</div>
                <div className="text-hotel-charcoal">Personalized Service</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=2070&auto=format&fit=crop" 
              alt="Dream Hotel Building" 
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <div className="font-serif text-2xl text-hotel-charcoal mb-2">Established 1985</div>
              <p className="text-hotel-stone">From a small boutique hotel to a world-class luxury destination</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values Section */}
      <div className="bg-hotel-charcoal/5 py-20">
        <div className="container-custom">
          <SectionTitle
            subtitle="OUR VALUES"
            title="The Principles That Guide Us"
            description="At Dream Hotel, our core values shape everything we do, from how we design our spaces to how we interact with our guests."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mb-6">
                <Star className="text-hotel-gold" size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Excellence</h3>
              <p className="text-hotel-stone">
                We strive for excellence in every detail, from the quality of our linens to the attentiveness of our service.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mb-6">
                <Star className="text-hotel-gold" size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Authenticity</h3>
              <p className="text-hotel-stone">
                We embrace authenticity in our interactions, creating genuine connections with our guests and community.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mb-6">
                <Star className="text-hotel-gold" size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Innovation</h3>
              <p className="text-hotel-stone">
                We continuously innovate to enhance the guest experience, blending tradition with modern conveniences.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Info Section */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="text-hotel-gold" size={24} />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Our Address</h3>
            <p className="text-hotel-stone">
              123 Luxury Lane<br />
              Paradise City, PC 12345<br />
              United States
            </p>
          </div>
          
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="text-hotel-gold" size={24} />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Contact Us</h3>
            <p className="text-hotel-stone">
              Phone: +1 (123) 456-7890<br />
              Email: info@dreamhotel.com<br />
              Reservations: book@dreamhotel.com
            </p>
          </div>
          
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-hotel-gold" size={24} />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-hotel-charcoal">Opening Hours</h3>
            <p className="text-hotel-stone">
              Check-in: 3:00 PM - 12:00 AM<br />
              Check-out: Until 12:00 PM<br />
              Reception: 24/7
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
