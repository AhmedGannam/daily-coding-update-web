
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { getUserReports, Report } from '@/services/reports';
import { getUser } from '@/services/auth';
import { motion } from 'framer-motion';

export function MemberReports() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [member, setMember] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Fetch member info
        const memberData = await getUser(id);
        if (memberData) {
          setMember(memberData);
          
          // Fetch member's reports
          const memberReports = await getUserReports(id);
          setReports(memberReports);
        }
      } catch (error) {
        console.error('Failed to fetch member data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/members')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold flex items-center">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <User className="text-primary h-5 w-5" />
                  </span>
                  {member?.name || "Unknown Member"}'s Reports
                </>
              )}
            </h1>
          </motion.div>
        </div>
        
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
              <div className="text-lg font-display">Loading reports...</div>
            </motion.div>
          </div>
        ) : reports.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <h3 className="text-xl font-medium mb-2">No reports yet</h3>
            <p className="text-muted-foreground mb-6">
              This member hasn't created any reports yet.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default MemberReports;
