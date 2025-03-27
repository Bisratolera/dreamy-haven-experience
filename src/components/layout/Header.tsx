
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();

  // Check if current user is admin
  const isAdmin = user && ['admin@dreamhotel.com', 'manager@dreamhotel.com'].includes(user.email || '');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  // Make sure body doesn't scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'Places', path: '/places' },
    { name: 'Offers', path: '/offers' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <Link 
          to="/" 
          className="font-serif text-2xl tracking-tight text-hotel-charcoal transition-all duration-300 hover:text-hotel-gold"
        >
          Dream Hotel
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors duration-300 hover:text-hotel-gold",
                    isActive(link.path) 
                      ? "text-hotel-gold" 
                      : "text-hotel-charcoal"
                  )}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-hotel-gold animate-fade-in" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Book Now Button and User Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/rooms" 
            className="button-primary"
          >
            Book Now
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-hotel-charcoal/10">
                  <User className="h-5 w-5 text-hotel-charcoal" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-hotel-charcoal truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">My Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/active-bookings" className="cursor-pointer">Active Bookings</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-red-500 cursor-pointer flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" /> 
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="text-sm font-medium hover:text-hotel-gold transition-colors">
              Login
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          type="button"
          className="md:hidden text-hotel-charcoal"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-500 ease-elegant md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '60px' }}
      >
        <div className="container py-8">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center justify-between py-2 text-lg font-medium transition-colors duration-300 border-b border-muted",
                  isActive(link.path) 
                    ? "text-hotel-gold" 
                    : "text-hotel-charcoal"
                )}
              >
                {link.name}
                <ChevronRight size={18} className="text-hotel-stone" />
              </Link>
            ))}
            
            {/* Authentication Links for Mobile */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center justify-between py-2 text-lg font-medium transition-colors duration-300 border-b border-muted"
                >
                  My Profile
                  <ChevronRight size={18} className="text-hotel-stone" />
                </Link>
                
                {isAdmin && (
                  <>
                    <Link
                      to="/admin"
                      className="flex items-center justify-between py-2 text-lg font-medium transition-colors duration-300 border-b border-muted"
                    >
                      Admin Dashboard
                      <ChevronRight size={18} className="text-hotel-stone" />
                    </Link>
                    <Link
                      to="/admin/active-bookings"
                      className="flex items-center justify-between py-2 text-lg font-medium transition-colors duration-300 border-b border-muted"
                    >
                      Active Bookings
                      <ChevronRight size={18} className="text-hotel-stone" />
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-between py-2 text-lg font-medium text-red-500 transition-colors duration-300 border-b border-muted"
                >
                  Sign Out
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center justify-between py-2 text-lg font-medium transition-colors duration-300 border-b border-muted"
              >
                Login
                <ChevronRight size={18} className="text-hotel-stone" />
              </Link>
            )}
            
            <Link 
              to="/rooms" 
              className="button-primary w-full text-center mt-6"
            >
              Book Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
