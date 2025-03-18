
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MemberCard } from '@/components/ui/MemberCard';
import { getAllUsers } from '@/services/auth';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
}

export function Members() {
  const [members, setMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const users = await getAllUsers();
        setMembers(users);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
            Members
          </h1>
          <p className="text-muted-foreground">
            View all registered members and their reports
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
              <div className="text-lg font-display">Loading members...</div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <MemberCard 
                key={member.id} 
                id={member.id} 
                name={member.name} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Members;
