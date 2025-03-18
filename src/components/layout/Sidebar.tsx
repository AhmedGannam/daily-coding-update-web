
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Users, BookOpen, Info, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { logout } = useAuth();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  const handleLogout = async () => {
    await logout();
  };
  
  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Members', icon: Users, path: '/members' },
    { label: 'Study material', icon: BookOpen, path: '/study-material' },
    { label: 'About', icon: Info, path: '/about' },
  ];
  
  // Content for both mobile and desktop sidebar
  const sidebarContent = (
    <div className="h-full py-6 flex flex-col bg-sidebar-bg">
      <div className="mb-8 px-6">
        <h2 className="text-2xl font-display font-bold text-black">MemberTrackr</h2>
      </div>
      
      <nav className="flex-1 space-y-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              arrow-nav-item flex items-center h-12 px-4 text-black
              ${pathname === item.path ? 'bg-primary text-white font-medium' : 'bg-teal-300/80 hover:bg-teal-300'}
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        
        <button
          onClick={handleLogout}
          className="arrow-nav-item flex items-center w-full h-12 px-4 text-black bg-teal-300/80 hover:bg-teal-300"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
  
  return (
    <>
      {/* Mobile Sidebar with Hamburger Menu */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-none">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className={`hidden lg:block h-screen w-56 fixed left-0 top-0 ${className}`}
        >
          {sidebarContent}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
