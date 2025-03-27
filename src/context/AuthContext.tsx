
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string, phone?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = 'admin@dreamhotel.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get session from storage and set loading to false
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      
      // Check if this is the admin user
      if (session?.user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      
      // Check if this is the admin user
      if (session?.user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name?: string, phone?: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: name,
            phone: phone
          }
        }
      });
      
      if (error) throw error;
      
      // If signup is successful, create a profile record
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: email,
            full_name: name,
            phone: phone
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      toast.success('Sign up successful! Please check your email for verification.');
      return { error: null };
    } catch (error) {
      toast.error(error.message || 'An error occurred during sign up');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Special handling for admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Mock admin login
        setIsAdmin(true);
        // Create a mock user for admin
        const adminUser = {
          id: 'admin',
          email: ADMIN_EMAIL,
          user_metadata: {
            full_name: 'Administrator'
          }
        } as unknown as User;
        setUser(adminUser);
        toast.success('Admin logged in successfully!');
        return { error: null };
      }
      
      // Regular user login through Supabase
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully!');
      return { error: null };
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      if (isAdmin) {
        // Handle admin signout
        setIsAdmin(false);
        setUser(null);
        setSession(null);
        toast.success('Admin signed out successfully');
        return;
      }
      
      // Regular user signout through Supabase
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset instructions sent to your email');
      return { error: null };
    } catch (error) {
      toast.error(error.message || 'Error sending password reset email');
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
