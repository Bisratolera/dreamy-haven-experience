import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Users, Check, ChevronRight } from 'lucide-react';
import { useRoomDetails } from '@/hooks/useRoomDetails';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { room, loading, error } = useRoomDetails(Number(id));

  const roomImages = React.useMemo(() => {
    if (room?.images && room.images.length > 0) {
      return room.images;
    } else if (room?.image_url) { 
      return [room.image_url];
    }
    return [];
  }, [room]);

  const [mainImage, setMainImage] = React.useState(roomImages[0] || '');

  const handleBookNow = () => {
    navigate(`/booking?room=${id}`);
  };

  // Update mainImage when roomImages changes
  React.useEffect(() => {
    if (roomImages.length > 0 && (!mainImage || !roomImages.includes(mainImage))) {
      setMainImage(roomImages[0]);
    }
  }, [roomImages, mainImage]);

  if (loading) return <Layout><div className="container-custom py-12">Loading...</div></Layout>;
  if (error || !room) return <Layout><div className="container-custom py-12">{error || 'Room not found'}</div></Layout>;

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-hotel-gold">Home</a>
          <ChevronRight size={16} className="mx-2" />
          <a href="/rooms" className="hover:text-hotel-gold">Rooms</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-hotel-gold">{room.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src={mainImage} 
                alt={room.title}
                className="w-full h-[500px] object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {roomImages.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`cursor-pointer overflow-hidden rounded-md ${mainImage === image ? 'ring-2 ring-hotel-gold' : ''}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`Room view ${index + 1}`}
                    className="w-full h-24 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-md">
            <div className="mb-6">
              <h1 className="font-serif text-3xl mb-2 text-hotel-charcoal">{room.title}</h1>
              <div className="flex items-center text-hotel-stone mb-4">
                <Bed size={18} className="mr-1" />
                <span className="mr-4">{room.bedType}</span>
                <Users size={18} className="mr-1" />
                <span className="mr-4">{room.capacity} Guests</span>
                <span>{room.size} m²</span>
              </div>
              <div className="text-3xl font-serif text-hotel-gold mb-4">
                ${room.price} <span className="text-sm text-hotel-stone">/ night</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Select dates</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-300 rounded p-3">
                  <div className="text-xs text-gray-500">Check-in</div>
                  <div>Select date</div>
                </div>
                <div className="border border-gray-300 rounded p-3">
                  <div className="text-xs text-gray-500">Check-out</div>
                  <div>Select date</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-300 rounded p-3">
                  <div className="text-xs text-gray-500">Guests</div>
                  <div>2 Adults</div>
                </div>
                <div className="border border-gray-300 rounded p-3">
                  <div className="text-xs text-gray-500">Rooms</div>
                  <div>1 Room</div>
                </div>
              </div>
            </div>

            <Button 
              variant="primary"
              className="w-full mb-4"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
            <Button 
              variant="outline"
              className="w-full"
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-hotel-stone">
            <p className="text-lg leading-relaxed">{room.description}</p>
          </TabsContent>
          <TabsContent value="amenities" className="text-hotel-stone">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="features" className="text-hotel-stone">
            <p className="text-lg leading-relaxed">{room.features}</p>
          </TabsContent>
          <TabsContent value="policies" className="text-hotel-stone">
            <p className="text-lg leading-relaxed">{room.policies}</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RoomDetail;