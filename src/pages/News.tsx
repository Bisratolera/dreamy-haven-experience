
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { CalendarDays, User } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: 'Dream Hotel Awarded 5-Star Luxury Rating for Third Consecutive Year',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    date: 'June 15, 2025',
    author: 'Emma Thompson',
    excerpt: 'Dream Hotel has been recognized with the prestigious 5-Star Luxury Rating by International Hospitality Standards for the third year in a row, cementing its position as a leader in luxury accommodations.'
  },
  {
    id: 2,
    title: 'New Seasonal Menu Launched at Our Signature Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    date: 'May 28, 2025',
    author: 'James Wilson',
    excerpt: 'Our executive chef has unveiled a new seasonal menu featuring locally-sourced ingredients and innovative culinary techniques, offering guests an unforgettable dining experience that celebrates regional flavors.'
  },
  {
    id: 3,
    title: 'Dream Hotel Completes Luxury Spa Renovation',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    date: 'April 10, 2025',
    author: 'Sophia Chen',
    excerpt: 'After six months of extensive renovations, we are delighted to announce the reopening of our luxury spa featuring new treatment rooms, enhanced facilities, and an expanded menu of wellness services.'
  },
  {
    id: 4,
    title: 'Dream Hotel Hosts Prestigious International Conference',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop',
    date: 'March 22, 2025',
    author: 'Michael Brown',
    excerpt: 'Dream Hotel was proud to host the International Tourism Summit last week, welcoming industry leaders from around the world to discuss sustainable tourism practices and future trends.'
  },
  {
    id: 5,
    title: 'New Sustainability Initiatives Implemented Across All Hotel Operations',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
    date: 'February 15, 2025',
    author: 'David Clarke',
    excerpt: 'As part of our ongoing commitment to environmental responsibility, Dream Hotel has implemented several new sustainability initiatives aimed at reducing our carbon footprint and conserving natural resources.'
  },
  {
    id: 6,
    title: 'Dream Hotel Announces Partnership with Local Artisans',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop',
    date: 'January 30, 2025',
    author: 'Laura Martinez',
    excerpt: 'Dream Hotel is excited to announce a new partnership program with local artisans, featuring handcrafted items throughout our property and creating unique, authentic experiences for our guests.'
  }
];

const News = () => {
  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="UPDATES"
            title="Latest News & Events"
            description="Stay informed about the latest happenings, special events, and exciting developments at Dream Hotel."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <Card key={news.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-xs text-hotel-stone mb-3">
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{news.author}</span>
                  </div>
                </div>
                
                <Link to={`/news/${news.id}`}>
                  <h3 className="font-serif text-xl text-hotel-charcoal mb-3 hover:text-hotel-gold transition-colors duration-300">{news.title}</h3>
                </Link>
                
                <p className="text-hotel-stone mb-4 text-sm line-clamp-3">
                  {news.excerpt}
                </p>
                
                <Link 
                  to={`/news/${news.id}`} 
                  className="text-hotel-gold hover:text-hotel-charcoal text-sm font-medium transition-colors duration-300"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default News;
