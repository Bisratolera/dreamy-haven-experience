
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, User, ArrowLeft, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

// This would normally come from an API or CMS
const newsArticles = [
  {
    id: "1",
    title: 'Dream Hotel Awarded 5-Star Luxury Rating for Third Consecutive Year',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    date: 'June 15, 2025',
    author: 'Emma Thompson',
    content: `
      <p>Dream Hotel is proud to announce that we have been awarded the prestigious 5-Star Luxury Rating by International Hospitality Standards for the third consecutive year, solidifying our position as a leader in luxury hospitality.</p>
      
      <p>The International Hospitality Standards organization conducts rigorous, anonymous inspections of luxury properties worldwide, evaluating them on hundreds of criteria related to service excellence, facility quality, and overall guest experience.</p>
      
      <h3>Commitment to Excellence</h3>
      
      <p>"This recognition reflects our team's unwavering commitment to providing exceptional experiences for our guests," said Victoria Reynolds, General Manager of Dream Hotel. "Every day, our staff members go above and beyond to create memorable moments and personalized service that truly defines luxury."</p>
      
      <p>The inspectors particularly noted Dream Hotel's attention to detail, innovative guest amenities, and the staff's ability to anticipate needs before they arise as key factors in achieving the 5-star rating once again.</p>
      
      <h3>Continuous Improvement</h3>
      
      <p>Over the past year, Dream Hotel has invested significantly in enhancing the guest experience, including:</p>
      
      <ul>
        <li>A complete renovation of the luxury spa facilities</li>
        <li>Introduction of new culinary offerings at our signature restaurant</li>
        <li>Implementation of advanced technology for seamless guest experiences</li>
        <li>Enhanced sustainability initiatives throughout all operations</li>
      </ul>
      
      <p>These improvements have not only maintained our high standards but elevated the overall guest experience to new heights.</p>
      
      <h3>Looking Forward</h3>
      
      <p>As we celebrate this achievement, we remain focused on innovation and excellence. The hospitality landscape continues to evolve, and Dream Hotel is committed to staying at the forefront, setting new standards for luxury accommodations and service.</p>
      
      <p>We extend our sincere gratitude to our guests whose loyalty and feedback drive our continuous improvement, and to our dedicated team members whose passion and commitment make Dream Hotel truly exceptional.</p>
    `,
    relatedArticles: [2, 3, 5]
  },
  {
    id: "2",
    title: 'New Seasonal Menu Launched at Our Signature Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    date: 'May 28, 2025',
    author: 'James Wilson',
    content: `
      <p>Our executive chef has unveiled an exciting new seasonal menu at our signature restaurant, featuring locally-sourced ingredients and innovative culinary techniques that celebrate the rich flavors of the region.</p>
      
      <p>The new menu represents a culmination of months of creative development, collaboration with local farmers and producers, and a dedication to sustainable dining practices that align with Dream Hotel's commitment to environmental responsibility.</p>
      
      <h3>Farm-to-Table Excellence</h3>
      
      <p>"We've developed relationships with over twenty local farmers, fishermen, and artisanal producers within a 50-mile radius," explains Executive Chef Daniel Martinez. "This allows us to showcase the very best seasonal ingredients while supporting our local community and reducing our carbon footprint."</p>
      
      <p>Standout dishes on the new menu include locally-caught seafood with foraged coastal herbs, heritage breed pork from a neighboring family farm, and vegetables harvested from our own rooftop garden.</p>
      
      <h3>Culinary Innovation</h3>
      
      <p>The menu also features several innovative techniques and presentations that elevate the dining experience, including:</p>
      
      <ul>
        <li>Table-side preparations that engage guests in the culinary process</li>
        <li>Custom-designed serveware created by local artisans</li>
        <li>Creative flavor combinations that surprise and delight the palate</li>
        <li>Plant-based options that showcase vegetables as the star of the plate</li>
      </ul>
      
      <h3>A Complete Sensory Experience</h3>
      
      <p>The restaurant's wine program has also been updated to complement the new menu, with a carefully curated selection of local and international wines, many from small-production, sustainable vineyards.</p>
      
      <p>We invite our guests and locals alike to experience our new menu and discover the remarkable flavors of the season in a setting that exemplifies modern luxury and warm hospitality.</p>
    `,
    relatedArticles: [1, 3, 6]
  },
  {
    id: "3",
    title: 'Dream Hotel Completes Luxury Spa Renovation',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    date: 'April 10, 2025',
    author: 'Sophia Chen',
    content: `
      <p>After six months of extensive renovations, we are delighted to announce the reopening of our luxury spa, now offering an enhanced wellness experience with new treatment rooms, expanded facilities, and an innovative menu of services.</p>
      
      <p>The renovation represents a significant investment in our wellness offerings and underscores Dream Hotel's commitment to providing holistic experiences that nurture both body and mind.</p>
      
      <h3>Enhanced Facilities</h3>
      
      <p>The newly renovated spa features:</p>
      
      <ul>
        <li>Eight treatment rooms, including two luxury couples' suites</li>
        <li>An expanded hydrotherapy area with vitality pool, experience showers, and ice fountain</li>
        <li>A new meditation garden with living plant walls and a natural stone fountain</li>
        <li>State-of-the-art fitness center with personal training services</li>
        <li>Dedicated yoga and mindfulness studio with floor-to-ceiling views of the surrounding landscape</li>
      </ul>
      
      <h3>Innovative Treatments</h3>
      
      <p>"Our new treatment menu blends time-honored wellness traditions from around the world with cutting-edge therapeutic techniques," explains Spa Director Amara Johnson. "We've partnered with leading wellness brands that share our commitment to sustainability and efficacy."</p>
      
      <p>Signature treatments include a 90-minute ritual incorporating local botanical ingredients, advanced facial treatments using non-invasive technology, and customized wellness programs for guests seeking comprehensive health benefits.</p>
      
      <h3>Sustainability Focus</h3>
      
      <p>The renovation was completed with a strong emphasis on sustainability, incorporating:</p>
      
      <ul>
        <li>Energy-efficient lighting and climate control systems</li>
        <li>Water conservation features throughout hydrotherapy areas</li>
        <li>Sustainable materials and finishes with low environmental impact</li>
        <li>Product partnerships with eco-conscious skincare brands</li>
      </ul>
      
      <p>The spa is now open to hotel guests and day visitors by appointment, offering a tranquil retreat for relaxation and rejuvenation in the heart of Dream Hotel.</p>
    `,
    relatedArticles: [1, 5, 6]
  }
];

// More articles would be defined here

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the current article
  const article = newsArticles.find(article => article.id === id);
  
  // Handle article not found
  if (!article) {
    return (
      <Layout>
        <div className="container-custom py-20">
          <h1 className="text-2xl font-serif mb-4">Article Not Found</h1>
          <p>Sorry, the article you're looking for could not be found.</p>
          <Link to="/news" className="text-hotel-gold hover:text-hotel-charcoal mt-4 inline-block">
            ← Back to News
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get related articles
  const relatedArticles = article.relatedArticles
    .map(relId => newsArticles.find(a => a.id === relId.toString()))
    .filter(Boolean);
  
  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-16">
        <div className="container-custom">
          <Link to="/news" className="inline-flex items-center text-hotel-stone hover:text-hotel-gold mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to News
          </Link>
          
          <h1 className="font-serif text-3xl md:text-4xl text-hotel-charcoal mb-6">{article.title}</h1>
          
          <div className="flex items-center text-sm text-hotel-stone space-x-6 mb-6">
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto rounded-md"
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a 
                  href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href={`mailto:?subject=${article.title}&body=Check out this article: ${window.location.href}`} 
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-hotel-stone text-hotel-stone hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                  aria-label="Share via Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="p-6">
              <h3 className="font-serif text-xl mb-6">Related Articles</h3>
              
              <div className="space-y-6">
                {relatedArticles.map((relArticle) => (
                  <div key={relArticle?.id} className="flex flex-col space-y-2">
                    <Link 
                      to={`/news/${relArticle?.id}`}
                      className="font-medium hover:text-hotel-gold transition-colors"
                    >
                      {relArticle?.title}
                    </Link>
                    <div className="text-xs text-hotel-stone">
                      {relArticle?.date}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
