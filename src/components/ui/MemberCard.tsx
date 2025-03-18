
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MemberCardProps {
  id: string;
  name: string;
  index: number;
}

export function MemberCard({ id, name, index }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="h-full bg-white/70 backdrop-blur-sm border-none shadow hover:shadow-md transition-all">
        <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="text-primary h-6 w-6" />
          </div>
          
          <h3 className="text-xl font-semibold font-display">{name}</h3>
          
          <Link to={`/member-reports/${id}`}>
            <Button 
              className="w-full bg-accent text-black hover:bg-accent/80"
            >
              View reports
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MemberCard;
