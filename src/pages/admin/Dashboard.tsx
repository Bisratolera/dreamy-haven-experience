import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { useBookingManagement } from '@/hooks/useBookingManagement';
import BookingFilters from '@/components/admin/BookingFilters';
import BookingsTable from '@/components/admin/BookingsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BedDouble, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

// Type definitions
interface UserInfo {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

interface RoomInfo {
  id: number;
  title: string;
  price: number;
  capacity: number;
  bed_type: string;
  availability: boolean;
  size: string;
  description: string;
  amenities: string | string[];
  image_url: string;
  images: string[];
  features: string;
  policies: string;
}

const Dashboard = () => {
  const {
    bookings,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortConfig,
    requestSort,
    getSortedBookings,
    updateBookingStatus,
    viewBookingDetails
  } = useBookingManagement();
  
  const { user, isAdmin } = useAuth();
  const filteredBookings = getSortedBookings();
  
  const [userProfiles, setUserProfiles] = useState<UserInfo[]>([]);
  const [availableRooms, setAvailableRooms] = useState<RoomInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomInfo | null>(null);
  const [formData, setFormData] = useState<RoomInfo>({
    id: 0,
    title: '',
    price: 0,
    capacity: 0,
    bed_type: '',
    availability: true,
    size: '',
    description: '',
    amenities: '',
    image_url: '',
    images: ['', '', ''],
    features: '',
    policies: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      try {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
        if (profilesError) throw profilesError;
        setUserProfiles(profilesData || []);

        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select('id, title, price, capacity, bed_type, size, description, amenities, image_url, images, features, policies');
        if (roomsError) throw roomsError;
        
        const roomsWithAvailability = await Promise.all(
          (roomsData || []).map(async (room) => {
            const { data: bookingData } = await supabase
              .from('bookings')
              .select('*')
              .eq('room_id', room.id)
              .eq('status', 'confirmed')
              .lte('check_in', new Date().toISOString())
              .gte('check_out', new Date().toISOString());
            
            return {
              ...room,
              availability: !(bookingData && bookingData.length > 0)
            };
          })
        );
        
        setAvailableRooms(roomsWithAvailability);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('image_')) {
      const index = parseInt(name.split('_')[1]);
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((img, i) => (i === index ? value : img))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'capacity' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amenitiesArray = formData.amenities
        .toString()
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const roomData = {
        title: formData.title,
        price: formData.price,
        capacity: formData.capacity,
        bed_type: formData.bed_type,
        size: formData.size,
        description: formData.description,
        amenities: amenitiesArray,
        image_url: formData.image_url,
        images: formData.images.filter(img => img.length > 0),
        features: formData.features,
        policies: formData.policies
      };

      if (currentRoom) {
        const { error } = await supabase
          .from('rooms')
          .update(roomData)
          .eq('id', currentRoom.id);
          
        if (error) throw error;
        
        setAvailableRooms(prev =>
          prev.map(room =>
            room.id === currentRoom.id ? { ...room, ...formData, amenities: amenitiesArray } : room
          )
        );
      } else {
        const { data, error } = await supabase
          .from('rooms')
          .insert([roomData])
          .select();
          
        if (error) throw error;
        if (data) setAvailableRooms(prev => [...prev, { ...data[0], availability: true }]);
      }
      
      setIsModalOpen(false);
      setCurrentRoom(null);
    } catch (error) {
      console.error('Error submitting room:', error);
    }
  };

  const openModal = (room: RoomInfo | null) => {
    setCurrentRoom(room);
    setFormData(room ? {
      ...room,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities,
      images: room.images && room.images.length >= 3 ? room.images : [...(room.images || []), ...Array(3 - (room.images?.length || 0)).fill('')]
    } : {
      id: 0,
      title: '',
      price: 0,
      capacity: 0,
      bed_type: '',
      availability: true,
      size: '',
      description: '',
      amenities: '',
      image_url: '',
      images: ['', '', ''],
      features: '',
      policies: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (roomId: number) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);
        
      if (error) throw error;
      setAvailableRooms(prev => prev.filter(room => room.id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-12 mb-8">
        <div className="container-custom">
          <SectionTitle
            subtitle="ADMIN PANEL"
            title="Hotel Management Dashboard"
            description={`Welcome${isAdmin ? ' Administrator' : ''}! Manage your hotel operations from this central dashboard.`}
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-hotel-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
              <BedDouble className="h-4 w-4 text-hotel-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-hotel-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Users className="h-4 w-4 text-hotel-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/admin/active-bookings" className="button-primary">Active Bookings</Link>
          <button onClick={() => openModal(null)} className="button-primary">Add New Room</button>
          <Link to="/rooms" className="button-outline">Manage Rooms</Link>
        </div>

        <Tabs defaultValue="all-bookings" className="w-full mb-8">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all-bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings})</TabsTrigger>
            <TabsTrigger value="users">Users ({userProfiles.length})</TabsTrigger>
            <TabsTrigger value="rooms">Rooms ({availableRooms.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all-bookings">
            <div className="bg-white p-6 rounded-md shadow-card">
              <BookingFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              <BookingsTable
                bookings={filteredBookings}
                sortConfig={sortConfig}
                requestSort={requestSort}
                updateBookingStatus={updateBookingStatus}
                viewBookingDetails={viewBookingDetails}
              />
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="bg-white p-6 rounded-md shadow-card">
              <BookingFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter="pending"
                setStatusFilter={() => {}}
              />
              <BookingsTable
                bookings={bookings.filter(b => b.status === 'pending')}
                sortConfig={sortConfig}
                requestSort={requestSort}
                updateBookingStatus={updateBookingStatus}
                viewBookingDetails={viewBookingDetails}
              />
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="bg-white p-6 rounded-md shadow-card">
              <BookingFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter="cancelled"
                setStatusFilter={() => {}}
              />
              <BookingsTable
                bookings={bookings.filter(b => b.status === 'cancelled')}
                sortConfig={sortConfig}
                requestSort={requestSort}
                updateBookingStatus={updateBookingStatus}
                viewBookingDetails={viewBookingDetails}
              />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white p-6 rounded-md shadow-card">
              <h2 className="text-lg font-medium">Users</h2>
              <ul className="mt-4 space-y-2">
                {userProfiles.map(userProfile => (
                  <li key={userProfile.id}>{userProfile.full_name || userProfile.email}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="rooms">
            <div className="bg-white p-6 rounded-md shadow-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Available Rooms</h2>
                <button onClick={() => openModal(null)} className="button-primary">Add Room</button>
              </div>
              {loading ? (
                <p>Loading rooms...</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {availableRooms.map(room => (
                    <li key={room.id} className="flex justify-between items-center border p-4 rounded">
                      <div>
                        <h3 className="font-bold">{room.title}</h3>
                        <p>{room.description}</p>
                        <p>Price: ${room.price} | Capacity: {room.capacity}</p>
                        <p>Bed: {room.bed_type} | Size: {room.size}</p>
                        <p>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities}</p>
                        <p>Features: {room.features}</p>
                        <p>Policies: {room.policies}</p>
                        <p>Status: {room.availability ? 'Available' : 'Occupied'}</p>
                        <div className="flex gap-2 mt-2">
                          {room.image_url && (
                            <img src={room.image_url} alt={room.title} className="w-16 h-16 object-cover" />
                          )}
                          {room.images && room.images.map((img, index) => img && (
                            <img key={index} src={img} alt={`Room ${index + 1}`} className="w-16 h-16 object-cover" />
                          ))}
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button onClick={() => openModal(room)} className="button-outline">Edit</button>
                        <button onClick={() => handleDelete(room.id)} className="button-danger">Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{currentRoom ? 'Edit Room' : 'Add New Room'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Bed Type</label>
                <input
                  type="text"
                  name="bed_type"
                  value={formData.bed_type}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Amenities (comma-separated)</label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows={2}
                  placeholder="e.g., wifi, tv, minibar"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Primary Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              {[0, 1, 2].map(index => (
                <div key={index}>
                  <label className="block mb-1">Image URL {index + 1}</label>
                  <input
                    type="text"
                    name={`image_${index}`}
                    value={formData.images[index]}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1">Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-1">Policies</label>
                <textarea
                  name="policies"
                  value={formData.policies}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="submit" className="button-primary">Save</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="button-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;