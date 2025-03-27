
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: number;
          title: string;
          description: string;
          price: number;
          capacity: number;
          size: number;
          bed_type: string;
          amenities: string[];
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          price: number;
          capacity: number;
          size: number;
          bed_type: string;
          amenities: string[];
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          price?: number;
          capacity?: number;
          size?: number;
          bed_type?: string;
          amenities?: string[];
          image_url?: string;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: number;
          room_id: number;
          guest_name: string;
          email: string;
          phone: string;
          check_in: string;
          check_out: string;
          adults: number;
          children: number;
          special_requests?: string;
          status: 'confirmed' | 'pending' | 'cancelled';
          total_price: number;
          created_at: string;
          user_id?: string;
          updated_at?: string;
          updated_by?: string;
        };
        Insert: {
          id?: number;
          room_id: number;
          guest_name: string;
          email: string;
          phone: string;
          check_in: string;
          check_out: string;
          adults: number;
          children: number;
          special_requests?: string;
          status?: 'confirmed' | 'pending' | 'cancelled';
          total_price: number;
          created_at?: string;
          user_id?: string;
          updated_at?: string;
          updated_by?: string;
        };
        Update: {
          id?: number;
          room_id?: number;
          guest_name?: string;
          email?: string;
          phone?: string;
          check_in?: string;
          check_out?: string;
          adults?: number;
          children?: number;
          special_requests?: string;
          status?: 'confirmed' | 'pending' | 'cancelled';
          total_price?: number;
          created_at?: string;
          user_id?: string;
          updated_at?: string;
          updated_by?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name?: string;
          phone?: string;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          phone?: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
      };
      admins: {
        Row: {
          admin_id: string;
          permissions: string[];
          notes?: string;
          created_at: string;
        };
        Insert: {
          admin_id: string;
          permissions?: string[];
          notes?: string;
          created_at?: string;
        };
        Update: {
          admin_id?: string;
          permissions?: string[];
          notes?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      room_availability: {
        Row: {
          id: number;
          title: string;
          price: number;
          capacity: number;
          bed_type: string;
          available: boolean;
        };
      };
    };
  };
}
