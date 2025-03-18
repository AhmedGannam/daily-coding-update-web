
import { delay } from '@/lib/utils';

export interface Report {
  id: string;
  userId: string;
  date: string;
  day: number;
  content?: string;
}

// Mock reports database
let mockReports: Report[] = [
  {
    id: '1',
    userId: '1',
    date: '2023-03-18',
    day: 1,
    content: 'First day report content'
  },
  {
    id: '2',
    userId: '1',
    date: '2023-03-19',
    day: 2,
    content: 'Second day report content'
  },
  {
    id: '3',
    userId: '1',
    date: '2023-03-20',
    day: 3,
    content: 'Third day report content'
  },
  {
    id: '4',
    userId: '1',
    date: '2023-03-21',
    day: 4,
    content: 'Fourth day report content'
  },
  {
    id: '5',
    userId: '1',
    date: '2023-03-22',
    day: 5,
    content: 'Fifth day report content'
  },
  {
    id: '6',
    userId: '1',
    date: '2023-03-23',
    day: 6,
    content: 'Sixth day report content'
  },
  {
    id: '7',
    userId: '2',
    date: '2023-03-18',
    day: 1,
    content: 'Jane\'s first day report'
  }
];

export async function getUserReports(userId: string): Promise<Report[]> {
  await delay(500);
  return mockReports.filter(report => report.userId === userId);
}

export async function createReport(userId: string, date: string): Promise<Report> {
  await delay(500);
  
  // Find the highest day number for this user
  const userReports = mockReports.filter(report => report.userId === userId);
  const highestDay = userReports.length > 0 
    ? Math.max(...userReports.map(report => report.day))
    : 0;
  
  const newReport: Report = {
    id: (mockReports.length + 1).toString(),
    userId,
    date,
    day: highestDay + 1
  };
  
  mockReports.push(newReport);
  return newReport;
}

export async function updateReport(reportId: string, content: string): Promise<Report> {
  await delay(500);
  
  const reportIndex = mockReports.findIndex(report => report.id === reportId);
  if (reportIndex === -1) {
    throw new Error('Report not found');
  }
  
  mockReports[reportIndex] = {
    ...mockReports[reportIndex],
    content
  };
  
  return mockReports[reportIndex];
}

export async function getReport(reportId: string): Promise<Report | null> {
  await delay(500);
  const report = mockReports.find(report => report.id === reportId);
  return report || null;
}
