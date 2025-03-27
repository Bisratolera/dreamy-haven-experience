
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/common/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to Supabase or an API
    console.log('Form submitted');
  };

  return (
    <Layout>
      {/* Contact Hero */}
      <div className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-6">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Contact Us</h1>
            <p className="text-xl">We'd love to hear from you. Reach out and let us know how we can help.</p>
          </div>
        </div>
      </div>
      
      {/* Contact Info Cards */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-hotel-gold" size={20} />
            </div>
            <h3 className="font-medium text-lg mb-2 text-hotel-charcoal">Phone</h3>
            <p className="text-hotel-stone">+1 (123) 456-7890</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-hotel-gold" size={20} />
            </div>
            <h3 className="font-medium text-lg mb-2 text-hotel-charcoal">Email</h3>
            <p className="text-hotel-stone">info@dreamhotel.com</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-hotel-gold" size={20} />
            </div>
            <h3 className="font-medium text-lg mb-2 text-hotel-charcoal">Location</h3>
            <p className="text-hotel-stone">123 Luxury Lane, Paradise City</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-hotel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-hotel-gold" size={20} />
            </div>
            <h3 className="font-medium text-lg mb-2 text-hotel-charcoal">Hours</h3>
            <p className="text-hotel-stone">Reception open 24/7</p>
          </div>
        </div>
        
        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle
              subtitle="GET IN TOUCH"
              title="Send Us a Message"
              description="If you have any questions or would like to make a reservation, please fill out the form below and we'll get back to you as soon as possible."
              align="left"
            />
            
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-hotel-charcoal">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-hotel-charcoal">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-hotel-charcoal">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-hotel-charcoal">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide details about your inquiry..." 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary"
                icon={<Send size={16} />}
              >
                Send Message
              </Button>
            </form>
          </div>
          
          <div>
            <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              {/* In a real app, you would include an actual map component here */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-73.9876543210987!3d40.7654321098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzU1LjYiTiA3M8KwNTknMTUuNiJX!5e0!3m2!1sen!2sus!4v1596348126543!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
