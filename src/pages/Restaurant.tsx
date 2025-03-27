
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar } from 'lucide-react';

const Restaurant = () => {
  const menuCategories = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];
  
  // Sample menu items
  const menuItems = {
    breakfast: [
      { id: 1, name: 'Continental Breakfast', description: 'Selection of freshly baked pastries, fruits, yogurt, and granola', price: 18 },
      { id: 2, name: 'Eggs Benedict', description: 'Poached eggs on English muffin with Canadian bacon and hollandaise sauce', price: 22 },
      { id: 3, name: 'Avocado Toast', description: 'Sourdough bread with smashed avocado, cherry tomatoes, and poached egg', price: 16 },
      { id: 4, name: 'Belgian Waffles', description: 'Served with maple syrup, fresh berries, and whipped cream', price: 17 },
    ],
    lunch: [
      { id: 1, name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze', price: 14 },
      { id: 2, name: 'Wagyu Beef Burger', description: 'Premium beef patty with aged cheddar, caramelized onions, and truffle aioli', price: 25 },
      { id: 3, name: 'Grilled Salmon', description: 'With roasted vegetables and lemon butter sauce', price: 28 },
      { id: 4, name: 'Wild Mushroom Risotto', description: 'Creamy Arborio rice with assorted wild mushrooms and Parmesan', price: 22 },
    ],
    dinner: [
      { id: 1, name: 'Filet Mignon', description: '8oz prime beef with truffle mashed potatoes and seasonal vegetables', price: 42 },
      { id: 2, name: 'Lobster Linguine', description: 'Fresh lobster meat with linguine in a rich tomato and white wine sauce', price: 38 },
      { id: 3, name: 'Duck Confit', description: 'Slow-cooked duck leg with cherry sauce, roasted potatoes, and wilted greens', price: 36 },
      { id: 4, name: 'Vegetable Wellington', description: 'Roasted vegetables wrapped in puff pastry with mushroom sauce', price: 28 },
    ],
    desserts: [
      { id: 1, name: 'Chocolate Soufflé', description: 'Warm chocolate soufflé with vanilla ice cream', price: 14 },
      { id: 2, name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelized sugar crust', price: 12 },
      { id: 3, name: 'Tiramisu', description: 'Coffee-soaked ladyfingers with mascarpone cream', price: 13 },
      { id: 4, name: 'Berry Panna Cotta', description: 'Vanilla panna cotta with fresh berry compote', price: 11 },
    ],
    drinks: [
      { id: 1, name: 'Signature Martini', description: 'Vodka, elderflower liqueur, and fresh lemon', price: 16 },
      { id: 2, name: 'Aged Negroni', description: 'Barrel-aged gin, Campari, and sweet vermouth', price: 18 },
      { id: 3, name: 'Sommelier\'s Wine Selection', description: 'Ask your server for today\'s premium selection by the glass', price: 14 },
      { id: 4, name: 'Artisanal Coffee', description: 'Locally roasted coffee beans prepared to your preference', price: 6 },
    ],
  };

  return (
    <Layout>
      {/* Restaurant Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-6">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Fine Dining</h1>
            <p className="text-xl md:text-2xl">Experience culinary excellence at our signature restaurant</p>
          </div>
        </div>
      </div>
      
      {/* Restaurant Introduction */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              subtitle="CULINARY EXCELLENCE"
              title="The Amber Room"
              description="Our signature restaurant offers an unforgettable dining experience, featuring innovative cuisine crafted from the finest local and international ingredients."
              align="left"
            />
            
            <p className="text-hotel-stone mb-6">
              Led by renowned Chef Michael Laurent, The Amber Room presents a sophisticated menu that blends classical techniques with contemporary flair. Each dish is meticulously prepared and artfully presented, creating a feast for all the senses.
            </p>
            
            <div className="flex items-center text-hotel-stone mb-6">
              <Clock size={20} className="mr-2 text-hotel-gold" />
              <div>
                <div className="font-medium text-hotel-charcoal">Opening Hours</div>
                <div>Breakfast: 7:00 AM - 10:30 AM</div>
                <div>Lunch: 12:00 PM - 2:30 PM</div>
                <div>Dinner: 6:00 PM - 10:00 PM</div>
              </div>
            </div>
            
            <Button 
              variant="primary"
              icon={<Calendar size={16} />}
            >
              Reserve a Table
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?q=80&w=1974&auto=format&fit=crop" 
              alt="Restaurant interior" 
              className="rounded-lg w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1600891964599-f61f9a767523?q=80&w=2070&auto=format&fit=crop" 
              alt="Plated dish" 
              className="rounded-lg w-full h-64 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=1935&auto=format&fit=crop" 
              alt="Chef cooking" 
              className="rounded-lg w-full h-64 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              alt="Cocktail" 
              className="rounded-lg w-full h-64 object-cover" 
            />
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="bg-hotel-charcoal/5 py-16">
        <div className="container-custom">
          <SectionTitle
            subtitle="OUR MENU"
            title="Culinary Delights"
            description="Explore our seasonal menu featuring the finest ingredients and expertly crafted dishes."
          />
          
          <Tabs defaultValue="breakfast" className="mt-12">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {menuCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(menuItems).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {items.map(item => (
                    <div key={item.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-serif text-xl text-hotel-charcoal">{item.name}</h3>
                        <span className="font-serif text-hotel-gold">${item.price}</span>
                      </div>
                      <p className="text-hotel-stone">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-12">
            <p className="text-hotel-stone italic mb-6">
              All dishes are prepared using locally sourced ingredients whenever possible.<br />
              Please inform your server of any allergies or dietary restrictions.
            </p>
            <Button 
              variant="primary"
              icon={<Calendar size={16} />}
            >
              Make a Reservation
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chef's Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop" 
              alt="Chef Michael Laurent" 
              className="rounded-lg w-full h-[500px] object-cover"
            />
          </div>
          
          <div>
            <SectionTitle
              subtitle="MEET THE CHEF"
              title="Chef Michael Laurent"
              description="With over 20 years of experience in prestigious kitchens around the world, Chef Michael brings his passion and expertise to every dish at The Amber Room."
              align="left"
            />
            
            <p className="text-hotel-stone mb-6">
              Chef Michael began his culinary journey in Paris, where he trained under several Michelin-starred chefs. His cooking philosophy centers on respecting the ingredients, combining classical techniques with innovative approaches, and creating memorable dining experiences.
            </p>
            
            <blockquote className="border-l-4 border-hotel-gold pl-4 italic text-lg text-hotel-stone mb-6">
              "My goal is to create dishes that not only delight the palate but tell a story and create lasting memories for our guests."
            </blockquote>
            
            <p className="text-hotel-stone">
              Under Chef Michael's leadership, The Amber Room has received numerous accolades, including recognition in the top 50 restaurants in the country and multiple culinary excellence awards.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
