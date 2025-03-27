
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full px-4 py-3 bg-white border border-hotel-sand focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold outline-none transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-0 top-0 h-full px-4 text-hotel-gold hover:text-hotel-charcoal transition-colors duration-300 disabled:opacity-50"
          aria-label="Subscribe"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default Newsletter;
