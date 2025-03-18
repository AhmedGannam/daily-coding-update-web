
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Users, BookOpen, Info, LogOut, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  
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
    <div className="h-full py-6 flex flex-col bg-gradient-to-b from-blue-500/90 to-blue-600/90 text-white">
      <div className="mb-8 px-6">
        <h2 className="text-2xl font-display font-bold text-white">MemberTrackr</h2>
        {user && (
          <p className="text-sm text-blue-100 mt-2 opacity-80">
            Logged in as {user.name}
          </p>
        )}
      </div>
      
      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center h-12 px-4 rounded-md transition-all duration-200 
              ${pathname === item.path 
                ? 'bg-white text-blue-600 font-medium shadow-md' 
                : 'text-white hover:bg-white/20'}
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.label}</span>
            
            {pathname === item.path && (
              <motion.div
                layoutId="sidebar-active-indicator"
                className="ml-auto w-1.5 h-5 rounded-full bg-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto px-3">
        <div className="p-4 mb-4 rounded-lg bg-blue-700/30">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-200" />
            <div className="ml-3">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs text-blue-200">Check documentation</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full h-12 px-4 rounded-md text-white hover:bg-white/20 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Mobile Sidebar with Hamburger Menu */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] border-none">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className={`hidden lg:block h-screen w-64 fixed left-0 top-0 z-30 ${className}`}
        >
          {sidebarContent}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
