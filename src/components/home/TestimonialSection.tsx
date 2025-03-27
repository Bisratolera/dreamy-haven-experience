
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import SectionTitle from '@/components/common/SectionTitle';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Johnson',
    position: 'Business Traveler',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'My stay at Dream Hotel exceeded all expectations. The attention to detail, from the personalized welcome to the immaculate room service, was truly remarkable. I\'ve found my new home away from home.',
  },
  {
    id: 2,
    name: 'Michael Thompson',
    position: 'Family Vacation',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'We had an incredible family vacation at Dream Hotel. The staff was exceptionally attentive to our children\'s needs, and the amenities kept everyone entertained. The rooms were spacious and beautifully designed. Highly recommend!',
  },
  {
    id: 3,
    name: 'Sophia Williams',
    position: 'Honeymoon Stay',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    rating: 5,
    text: 'Our honeymoon at Dream Hotel was absolutely magical. The romantic touches in our suite, the breathtaking views, and the exceptional dining experiences created memories we\'ll cherish forever. Pure luxury from start to finish.',
  },
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-hotel-charcoal/5 to-transparent"></div>
      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle="Testimonials"
          title="What Our Guests Say"
          description="Discover the experiences of our valued guests and why they choose Dream Hotel for their stays."
        />
        
        <div className="relative mt-12 max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-elegant"
              style={{ transform: `translateX(-${currentSlide * 100}%)`, display: 'flex' }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-hotel-beige p-8 md:p-10 shadow-elegant">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={index < testimonial.rating ? "fill-hotel-gold text-hotel-gold" : "text-hotel-stone"}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="font-serif text-xl md:text-2xl italic mb-8 text-hotel-charcoal">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-hotel-charcoal">{testimonial.name}</h4>
                        <p className="text-sm text-hotel-stone">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentSlide ? "bg-hotel-gold scale-110" : "bg-hotel-stone/30"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
