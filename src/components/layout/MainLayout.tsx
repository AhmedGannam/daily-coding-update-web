
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./Sidebar";
import AuthForms from "../auth/AuthForms";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-md"
        >
          <div className="text-2xl font-display text-center">Loading...</div>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <AuthForms />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Sidebar />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-1 lg:pl-64 pt-20 lg:pt-10 pb-10 w-full"
      >
        <div className="container mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
}

export default MainLayout;
