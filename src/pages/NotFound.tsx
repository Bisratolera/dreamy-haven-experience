
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-xl px-6">
          <h1 className="font-serif text-7xl md:text-9xl text-hotel-gold">404</h1>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-hotel-charcoal">Page Not Found</h2>
          <p className="text-hotel-stone mb-10 text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button 
            to="/" 
            variant="primary"
            icon={<ArrowLeft size={16} />}
            iconPosition="left"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
