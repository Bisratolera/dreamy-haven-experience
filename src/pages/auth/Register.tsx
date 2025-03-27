import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SectionTitle from '@/components/common/SectionTitle';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: "Please enter a valid phone number with at least 10 digits." }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterFormValues) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const { error } = await signUp(data.email, data.password, fullName, data.phone);
    if (!error) {
      toast.success('Account created! Please check your email to verify your account.');
      navigate('/login');
    } else {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="JOIN US"
            title="Create an Account"
            description="Sign up for a Dream Hotel account to enjoy exclusive benefits and easily manage your reservations."
          />
        </div>
      </div>
      <div className="container-custom mb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="John" {...field} className="pl-10" />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Doe" {...field} className="pl-10" />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="your.email@example.com" {...field} className="pl-10" />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="+1 (555) 000-0000" {...field} className="pl-10" />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="password" placeholder="Create a password" {...field} className="pl-10" />
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
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="password" placeholder="Confirm your password" {...field} className="pl-10" />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-stone h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
                <div className="text-center mt-4">
                  <p className="text-hotel-stone text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-hotel-gold hover:text-hotel-charcoal transition-colors">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;