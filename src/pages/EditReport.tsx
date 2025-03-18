
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { getReport, updateReport } from '@/services/reports';
import { formatDate, getReportCardColor } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export function EditReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [report, setReport] = useState<{
    id: string;
    date: string;
    day: number;
    content?: string;
    userId: string;
  } | null>(null);
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const fetchReport = async () => {
      if (!id || !user) return;
      
      try {
        const reportData = await getReport(id);
        if (reportData) {
          setReport(reportData);
          setContent(reportData.content || '');
          
          // Check if current user is the owner of this report
          if (reportData.userId === user.id) {
            setIsAuthorized(true);
          } else {
            // If not authorized, show toast and redirect to view page
            toast({
              title: "Access Denied",
              description: "You can only edit your own reports.",
              variant: "destructive",
            });
            navigate(`/view-report/${id}`);
          }
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
  }, [id, user, toast, navigate]);
  
  const handleSave = async () => {
    if (!id || !report || !isAuthorized) return;
    
    setIsSaving(true);
    try {
      await updateReport(id, content);
      toast({
        title: "Success",
        description: "Your report has been saved.",
      });
      
      // Navigate back after successful save
      navigate('/');
    } catch (error) {
      console.error('Failed to save report:', error);
      toast({
        title: "Error",
        description: "Failed to save your report.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!isAuthorized && !isLoading) {
    return null; // This prevents any flickering before redirect
  }
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto px-4 pt-8 pb-16"
      >
        <div className="mb-8 flex items-center">
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
              Edit Report
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
          <Card className={`border-none shadow-lg ${report ? getReportCardColor(report.day) : ''}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-2xl drop-shadow-md">
                Day {report.day}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white/90 backdrop-blur-sm rounded-b-lg p-6">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your daily report here..."
                className="min-h-[300px] resize-none border-none focus-visible:ring-1 shadow-inner p-6 text-lg"
              />
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/80 px-6"
                  size="lg"
                >
                  {isSaving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
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

export default EditReport;
