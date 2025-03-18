
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { getReport } from '@/services/reports';
import { formatDate, getReportCardColor } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function ViewReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<{
    id: string;
    date: string;
    day: number;
    content?: string;
    userId: string;
  } | null>(null);
  
  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      
      try {
        const reportData = await getReport(id);
        if (reportData) {
          setReport(reportData);
        }
      } catch (error) {
        console.error('Failed to fetch report:', error);
        toast({
          title: "Error",
          description: "Failed to load the report.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReport();
  }, [id, toast]);
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="text-3xl font-display font-bold">
              View Report
            </h1>
            {report && (
              <p className="text-muted-foreground">
                Day {report.day} - {formatDate(report.date)}
              </p>
            )}
          </div>
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
              <div className="text-lg font-display">Loading report...</div>
            </motion.div>
          </div>
        ) : report ? (
          <Card className={`border-none shadow-md ${report ? getReportCardColor(report.day) : ''}`}>
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Day {report.day}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white rounded-b-lg">
              <div className="min-h-[200px] bg-gray-50 rounded-md p-4 shadow-inner break-words whitespace-pre-wrap">
                {report.content || "No content for this report yet."}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">Report not found</h3>
            <p className="text-muted-foreground mb-6">
              The report you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              Go back to Home
            </Button>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}

export default ViewReport;
