
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { createReport } from '@/services/reports';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface AddReportButtonProps {
  onReportAdded: () => void;
}

export function AddReportButton({ onReportAdded }: AddReportButtonProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  
  const handleAddReport = async () => {
    if (!user) return;
    
    setIsCreating(true);
    try {
      // Get today's date in ISO format
      const today = new Date().toISOString().split('T')[0];
      await createReport(user.id, today);
      
      toast({
        title: "Report created",
        description: "Your new daily report has been created.",
      });
      
      onReportAdded();
    } catch (error) {
      toast({
        title: "Failed to create report",
        description: "There was an error creating your report.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ 
        y: { 
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }
      }}
    >
      <Button
        onClick={handleAddReport}
        disabled={isCreating}
        size="lg"
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/80 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}

export default AddReportButton;
