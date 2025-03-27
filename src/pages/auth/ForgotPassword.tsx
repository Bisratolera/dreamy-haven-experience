import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SectionTitle from '@/components/common/SectionTitle';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const { error } = await resetPassword(data.email);
    if (!error) {
      setIsSubmitted(true);
      toast.success('Password reset email sent. Please check your inbox.');
    } else {
      toast.error('Failed to send reset email. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="PASSWORD RESET"
            title="Forgot Your Password?"
            description="Enter your email address below and we'll send you a link to reset your password."
          />
        </div>
      </div>
      <div className="container-custom mb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-card border border-hotel-sand">
            {isSubmitted ? (
              <div className="text-center">
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                  Password reset instructions have been sent to your email.
                </div>
                <p className="text-hotel-stone mb-6">
                  Please check your email and follow the instructions to reset your password.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center text-hotel-gold hover:text-hotel-charcoal transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Return to Login
                </Link>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Reset Password'}
                  </Button>
                  <div className="text-center mt-4">
                    <Link
                      to="/login"
                      className="text-hotel-gold hover:text-hotel-charcoal transition-colors"
                    >
                      <ArrowLeft size={16} className="inline mr-1" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;