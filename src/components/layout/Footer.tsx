
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Newsletter from '@/components/common/Newsletter';

const Footer = () => {
  return (
    <footer className="bg-hotel-beige pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link to="/" className="font-serif text-2xl text-hotel-charcoal">
              Dream Hotel
            </Link>
            <p className="text-hotel-stone max-w-xs">
              Experience luxury redefined in our carefully crafted spaces designed for comfort and elegance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-6 text-hotel-charcoal">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Rooms & Suites', path: '/rooms' },
                { name: 'Restaurant', path: '/restaurant' },
                { name: 'Spa & Wellness', path: '/spa' },
                { name: 'Special Offers', path: '/offers' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-hotel-stone hover:text-hotel-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-6 text-hotel-charcoal">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-hotel-gold mt-1 mr-3 flex-shrink-0" />
                <span className="text-hotel-stone">
                  123 Elegance Avenue, Luxury District, City of Dreams, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-hotel-gold mr-3 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="text-hotel-stone hover:text-hotel-gold transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-hotel-gold mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@dreamhotel.com" 
                  className="text-hotel-stone hover:text-hotel-gold transition-colors duration-300"
                >
                  info@dreamhotel.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-6 text-hotel-charcoal">Newsletter</h3>
            <p className="text-hotel-stone mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <Newsletter />
          </div>
        </div>
        
        <div className="border-t border-hotel-sand mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-hotel-stone text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Dream Hotel. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-hotel-stone">
            <a href="#" className="hover:text-hotel-gold transition-colors duration-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-hotel-gold transition-colors duration-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-hotel-gold transition-colors duration-300">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
