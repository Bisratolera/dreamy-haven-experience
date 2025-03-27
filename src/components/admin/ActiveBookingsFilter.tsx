
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ActiveBookingsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ActiveBookingsFilter: React.FC<ActiveBookingsFilterProps> = ({
  searchTerm,
  setSearchTerm
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by name, email, phone..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Button variant="outline" onClick={() => navigate('/admin')}>
        View All Bookings
      </Button>
    </div>
  );
};

export default ActiveBookingsFilter;
