
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2079&auto=format&fit=crop',
    title: 'A Sanctuary of Elegance',
    subtitle: 'Welcome to Dream Hotel',
    description: 'Experience luxury like never before in our meticulously designed spaces',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop',
    title: 'Refined Comfort',
    subtitle: 'Unparalleled Experience',
    description: 'Every detail crafted to perfection for your ultimate relaxation',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
    title: 'Culinary Excellence',
    subtitle: 'Taste Redefined',
    description: 'Indulge in exquisite dining experiences created by world-class chefs',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-elegant",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Content */}
          <div className="container-custom relative h-full flex items-center">
            <div 
              className={cn(
                "max-w-xl text-white transition-all duration-1000 ease-elegant",
                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              <h3 className="text-sm md:text-base uppercase tracking-widest mb-4 text-white/80">
                {slide.subtitle}
              </h3>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  to="/rooms" 
                  variant="primary"
                  className="bg-hotel-gold hover:bg-white hover:text-hotel-charcoal"
                >
                  Explore Rooms
                </Button>
                <Button 
                  to="/about" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-hotel-charcoal"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 flex space-x-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm text-white hover:bg-hotel-gold transition-all duration-300"
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm text-white hover:bg-hotel-gold transition-all duration-300"
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 1000);
            }}
            className={cn(
              "w-12 h-1 transition-all duration-500",
              index === currentSlide ? "bg-hotel-gold" : "bg-white/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
