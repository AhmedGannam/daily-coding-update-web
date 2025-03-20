
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { PenSquare } from 'lucide-react';
import { formatDate, getReportCardColor } from '@/lib/utils';
import { Report } from '@/services/reports';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface ReportCardProps {
  report: Report;
  index: number;
}

export function ReportCard({ report, index }: ReportCardProps) {
  const { id, date, day, content, userId } = report;
  const { user } = useAuth();
  
  // Truncate content for preview (max 50 characters)
  const contentPreview = content 
    ? content.length > 50 
      ? content.substring(0, 50) + '...' 
      : content
    : 'No content yet';
  
  // Check if the current user is the owner of this report
  const isOwner = user?.id === userId;
  
  // If user is not the owner, they can only view the report
  const linkPath = isOwner ? `/edit-report/${id}` : `/view-report/${id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={linkPath} className="block h-full">
        <Card className={`
          h-56 rounded-lg border-none shadow-md hover:shadow-lg transition-all duration-300
          relative overflow-hidden
          ${getReportCardColor(day)}
        `}>
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
            <span className="text-black/80 font-medium">{formatDate(date)}</span>
            <PenSquare className={`h-5 w-5 ${isOwner ? "text-black/80" : "text-black/40"}`} />
          </div>
          
          <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-5xl font-display font-bold text-white drop-shadow-sm mb-4">
              {isOwner ? (
                <Link to={`/edit-report/${id}`}>
                  Day {day}
                </Link>
              ) : (
                <>Day {day}</>
              )}
          </h2>
            <div className="bg-white/70 p-2 rounded-md w-4/5 text-center text-sm line-clamp-2">
              {contentPreview}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ReportCard;
