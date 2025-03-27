import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, AdminInfo } from '@/types/booking.types';
import { toast } from 'sonner';

export function useAdminOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get all users
  const getAllUsers = async (): Promise<UserProfile[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
        
      if (error) throw error;
      
      const profiles: UserProfile[] = data.map(profile => ({
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name || undefined,
        phone: profile.phone || undefined,
        role: profile.role,
        createdAt: profile.created_at
      }));
      
      return profiles;
    } catch (err) {
      console.error('Error fetching all users:', err);
      setError('Failed to fetch users');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Make a user an admin
  const makeUserAdmin = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // First update the user's role in profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      // Then add an entry in the admins table
      const { error: adminError } = await supabase
        .from('admins')
        .upsert({ user_id: userId });
        
      if (adminError) throw adminError;
      
      toast.success('User promoted to admin');
      return true;
    } catch (err) {
      console.error('Error promoting user to admin:', err);
      setError('Failed to promote user to admin');
      toast.error('Failed to promote user to admin');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { getAllUsers, makeUserAdmin, loading, error };
}
