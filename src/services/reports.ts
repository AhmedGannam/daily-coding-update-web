// Real implementation of reports service using our API

export interface Report {
  id: string;
  userId: string;
  date: string;
  day: number;
  content?: string;
}

// API URL - in production, this would come from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for making authenticated requests
const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'x-auth-token': token } : {}),
    ...options.headers
  };

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
};

export async function getUserReports(userId: string): Promise<Report[]> {
  try {
    const response = await fetch(`${API_URL}/reports/user/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    
    const reports = await response.json();
    
    // Transform _id to id for frontend compatibility
    return reports.map((report: any) => ({
      id: report._id,
      userId: report.userId,
      date: report.date,
      day: report.day,
      content: report.content
    }));
  } catch (error) {
    console.error('Get user reports error:', error);
    return [];
  }
}

export async function createReport(userId: string, date: string): Promise<Report> {
  try {
    const response = await authFetch('/reports', {
      method: 'POST',
      body: JSON.stringify({ userId, date })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create report');
    }
    
    const report = await response.json();
    
    // Transform _id to id for frontend compatibility
    return {
      id: report._id,
      userId: report.userId,
      date: report.date,
      day: report.day,
      content: report.content
    };
  } catch (error) {
    console.error('Create report error:', error);
    throw error;
  }
}

export async function updateReport(reportId: string, content: string): Promise<Report> {
  try {
    const response = await authFetch(`/reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify({ content })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update report');
    }
    
    const report = await response.json();
    
    // Transform _id to id for frontend compatibility
    return {
      id: report._id,
      userId: report.userId,
      date: report.date,
      day: report.day,
      content: report.content
    };
  } catch (error) {
    console.error('Update report error:', error);
    throw error;
  }
}

export async function getReport(reportId: string): Promise<Report | null> {
  try {
    const response = await fetch(`${API_URL}/reports/${reportId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    
    const report = await response.json();
    
    // Transform _id to id for frontend compatibility
    return {
      id: report._id,
      userId: report.userId,
      date: report.date,
      day: report.day,
      content: report.content
    };
  } catch (error) {
    console.error('Get report error:', error);
    return null;
  }
}
