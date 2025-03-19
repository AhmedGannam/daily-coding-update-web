
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, AlertCircle } from 'lucide-react';
import { getUserReports, Report } from '@/services/reports';
import { getUser } from '@/services/auth';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function MemberReports() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [member, setMember] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Member ID is missing");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch member info
        console.log(`Fetching member with ID: ${id}`);
        const memberData = await getUser(id);
        
        if (memberData) {
          setMember(memberData);
          
          // Fetch member's reports
          console.log(`Fetching reports for member: ${id}`);
          const memberReports = await getUserReports(id);
          setReports(memberReports);
        } else {
          setError("Member not found");
          toast({
            title: "Error",
            description: "Could not find member information",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Failed to fetch member data:', error);
        setError("Failed to load member data");
        
        // Show toast with error
        toast({
          title: "Error loading data",
          description: error instanceof Error ? error.message : "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);
  
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 pt-8 pb-20">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/members')}
              className="mr-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold flex items-center justify-center">
              {isLoading ? (
                "Loading..."
              ) : error ? (
                <span className="flex items-center text-destructive">
                  <AlertCircle className="mr-2 h-6 w-6" />
                  Error Loading Member
                </span>
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
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Could not load reports</h3>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Button onClick={() => navigate('/members')}>
              Return to Members
            </Button>
          </motion.div>
        ) : reports.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-medium mb-2">No reports yet</h3>
            <p className="text-muted-foreground mb-6">
              This member hasn't created any reports yet.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
