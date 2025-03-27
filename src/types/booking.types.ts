
export interface Booking {
  id: number;
  roomId: number;
  roomName: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  userId?: string | null;
  updatedAt?: string;
  updatedBy?: string;
}

export interface BookingInput {
  roomId: number;
  guestName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
  totalPrice: number;
  userId?: string | null;
}

export interface ActiveBooking {
  id: number;
  roomId: number;
  roomName: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  nightsStayed: number;
  remainingNights: number;
  createdAt: string;
}

export interface ActiveBookingFilters {
  searchTerm: string;
  roomFilter: number | null;
}

export interface ActiveBookingSortConfig {
  key: keyof ActiveBooking | null;
  direction: 'ascending' | 'descending';
}

export interface SortConfig {
  key: keyof Booking | null;
  direction: 'ascending' | 'descending';
}

export interface BookingFilters {
  searchTerm: string;
  statusFilter: 'all' | 'confirmed' | 'pending' | 'cancelled';
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AdminInfo {
  adminId: string;
  permissions: string[];
  notes?: string;
  createdAt: string;
}
