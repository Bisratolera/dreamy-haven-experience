
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import SectionTitle from '@/components/common/SectionTitle';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check if we have the password reset hash in the URL
  useEffect(() => {
    const handleHashParams = async () => {
      // Supabase automatically handles the hash fragment
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast.error('Invalid or expired password reset link');
        navigate('/login');
      }
    };
    
    handleHashParams();
  }, [navigate]);
  
  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });
      
      if (error) throw error;
      
      setIsResetComplete(true);
      toast.success('Password has been reset successfully');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="SECURITY"
            title="Reset Your Password"
            description="Create a new password for your Dream Hotel account."
          />
        </div>
      </div>
      
      <div className="container-custom mb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
            {isResetComplete ? (
              <div className="text-center">
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                  Your password has been reset successfully.
                </div>
                <p className="text-hotel-stone mb-6">
                  You can now log in with your new password.
                </p>
                <Button asChild>
                  <Link to="/login">
                    Login with New Password
                  </Link>
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="password" 
                              placeholder="Create a new password" 
                              {...field} 
                              className="pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="password" 
                              placeholder="Confirm your new password" 
                              {...field} 
                              className="pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
