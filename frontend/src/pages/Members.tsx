import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import MemberCard from '@/components/ui/MemberCard';
import { getAllUsers } from '@/services/auth';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const users = await getAllUsers();
        setMembers(users);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError("Failed to load members. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);
  
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
            Our Members
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the people who are part of our community
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
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
            >
              <div className="text-xl font-display">Loading members...</div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Error</h3>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Link to="/">
              <span className="text-primary hover:underline">
                Return to Home
              </span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <MemberCard key={member._id} id={member._id} name={member.name} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Members;
