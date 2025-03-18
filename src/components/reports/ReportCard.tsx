
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { PenSquare } from 'lucide-react';
import { formatDate, getReportCardColor } from '@/lib/utils';
import { Report } from '@/services/reports';
import { motion } from 'framer-motion';

interface ReportCardProps {
  report: Report;
  index: number;
}

export function ReportCard({ report, index }: ReportCardProps) {
  const { id, date, day } = report;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/edit-report/${id}`} className="block h-full">
        <Card className={`
          h-56 rounded-lg border-none shadow-md hover:shadow-lg transition-all duration-300
          relative overflow-hidden
          ${getReportCardColor(day)}
        `}>
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
            <span className="text-black/80 font-medium">{formatDate(date)}</span>
            <PenSquare className="h-5 w-5 text-black/80" />
          </div>
          
          <div className="flex items-center justify-center h-full">
            <h2 className="text-5xl font-display font-bold text-white drop-shadow-sm">
              Day {day}
            </h2>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ReportCard;
