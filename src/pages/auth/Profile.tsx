import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, User, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import SectionTitle from '@/components/common/SectionTitle';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const profileSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }).nullable().optional(),
  phone: z.string().nullable().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      phone: '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user.email_confirmed_at) {
          setIsEmailVerified(true);
        } else {
          toast.error('Please verify your email to access profile settings.');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setProfileData(data);
          profileForm.reset({
            fullName: data.full_name,
            phone: data.phone,
          });
        } else {
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            username: user.email?.split('@')[0],
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user, profileForm]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user || !isEmailVerified) {
      toast.error('Please verify your email to update your profile.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone: data.phone,
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    if (!user || !isEmailVerified) {
      toast.error('Please verify your email to update your password.');
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: data.currentPassword,
      });
      if (signInError) throw new Error('Current password is incorrect');

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });
      if (error) throw error;

      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="MY ACCOUNT"
            title="Profile Settings"
            description="Update your profile information and account preferences."
          />
        </div>
      </div>
      <div className="container-custom mb-20">
        <div className="max-w-3xl mx-auto">
          {!isEmailVerified ? (
            <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand text-center">
              <p className="text-hotel-stone mb-6">
                Please verify your email address to access profile settings. Check your inbox for a verification link.
              </p>
            </div>
          ) : (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
                  <h3 className="text-xl font-medium mb-6">Basic Information</h3>
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-hotel-stone mb-1">Email</p>
                    <p className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-hotel-gold" />
                      {user.email}
                    </p>
                  </div>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  value={field.value || ''}
                                  className="pl-10"
                                />
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="+1 (555) 000-0000"
                                  {...field}
                                  value={field.value || ''}
                                  className="pl-10"
                                />
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              <TabsContent value="security" className="space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
                  <h3 className="text-xl font-medium mb-6">Change Password</h3>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="Enter current password"
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
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="Enter new password"
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
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="Confirm new password"
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
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
                  <h3 className="text-xl font-medium mb-6">Account Actions</h3>
                  <Button variant="destructive" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;