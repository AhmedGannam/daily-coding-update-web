
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { AddReportButton } from '@/components/reports/AddReportButton';
import { getUserReports, Report } from '@/services/reports';
import { motion } from 'framer-motion';

export function Home() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchReports = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userReports = await getUserReports(user.id);
      setReports(userReports);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchReports();
  }, [user]);
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage your daily reports
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
              Create your first daily report by clicking the + button
            </p>
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <span className="text-primary text-2xl">+</span>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>
        )}
        
        {/* Floating action button to add new report */}
        <AddReportButton onReportAdded={fetchReports} />
      </div>
    </MainLayout>
  );
}

export default Home;
