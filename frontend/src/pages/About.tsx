
import { MainLayout } from '@/components/layout/MainLayout';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

export function About() {
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
            About
          </h1>
          <p className="text-muted-foreground">
            Learn more about MemberTrackr
          </p>
        </motion.div>
        
        <div className="h-64 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
          >
            <Info className="text-primary h-8 w-8" />
          </motion.div>
          
          <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
          <p className="text-muted-foreground max-w-md">
            Information about the application and its features will be available here in a future update.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default About;
