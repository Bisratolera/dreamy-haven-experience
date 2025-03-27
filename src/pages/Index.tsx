
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import BookingForm from '@/components/home/BookingForm';
import AboutSection from '@/components/home/AboutSection';
import RoomSection from '@/components/home/RoomSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import GallerySection from '@/components/home/GallerySection';

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <div className="container-custom">
        <BookingForm />
      </div>
      <AboutSection />
      <RoomSection />
      <FeaturesSection />
      <TestimonialSection />
      <GallerySection />
    </Layout>
  );
};

export default Index;
