
-- SQL Schema for Dream Hotel System

-- Create an extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a profiles table to store user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a rooms table for hotel rooms
CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  capacity INTEGER NOT NULL,
  size INTEGER NOT NULL,
  bed_type TEXT NOT NULL,
  amenities TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a bookings table for room reservations
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) NOT NULL,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT CHECK (status IN ('confirmed', 'pending', 'cancelled')) NOT NULL DEFAULT 'pending',
  total_price NUMERIC NOT NULL,
  user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for rooms
INSERT INTO rooms (title, description, price, capacity, size, bed_type, amenities, image_url)
VALUES 
  ('Deluxe King Room', 'Spacious room with king-sized bed and city view.', 199.99, 2, 35, 'King', ARRAY['WiFi', 'TV', 'Mini Bar', 'Air Conditioning'], 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
  ('Twin Room', 'Comfortable room with two twin beds.', 149.99, 2, 30, 'Twin', ARRAY['WiFi', 'TV', 'Air Conditioning'], 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061'),
  ('Family Suite', 'Spacious suite for families with separate living area.', 299.99, 4, 60, 'King and Sofa Bed', ARRAY['WiFi', 'TV', 'Mini Bar', 'Air Conditioning', 'Kitchen'], 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'),
  ('Executive Suite', 'Luxury suite with premium amenities and separate work area.', 349.99, 2, 55, 'King', ARRAY['WiFi', 'TV', 'Mini Bar', 'Air Conditioning', 'Work Desk', 'Jacuzzi'], 'https://images.unsplash.com/photo-1590490359683-658d3d23f972');

-- Add roles for Row Level Security (RLS)
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Alter the profiles table to add a role column
ALTER TABLE profiles ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- Create a database view for room availability
CREATE OR REPLACE VIEW room_availability AS
SELECT 
  r.id,
  r.title,
  r.price,
  r.capacity,
  r.bed_type,
  -- A room is available if there's no confirmed booking for today where check_in <= today and check_out > today
  NOT EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.room_id = r.id
    AND b.status = 'confirmed'
    AND b.check_in <= CURRENT_DATE
    AND b.check_out > CURRENT_DATE
  ) AS available
FROM rooms r;

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
-- Admin can see and modify all bookings
CREATE POLICY admin_all_access ON bookings
  FOR ALL
  TO PUBLIC
  USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ));

-- Users can see only their own bookings
CREATE POLICY user_select_own ON bookings
  FOR SELECT
  TO PUBLIC
  USING (user_id = auth.uid());

-- Users can insert their own bookings
CREATE POLICY user_insert_own ON bookings
  FOR INSERT
  TO PUBLIC
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Users can update only their own bookings
CREATE POLICY user_update_own ON bookings
  FOR UPDATE
  TO PUBLIC
  USING (user_id = auth.uid());
