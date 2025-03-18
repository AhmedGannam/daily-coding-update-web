
// Real implementation of authentication service using our API

interface User {
  id: string;
  name: string;
  email: string;
}

// API URL - in production, this would come from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Store JWT token in localStorage
const TOKEN_KEY = 'auth_token';
const STORAGE_KEY = 'auth_user';

// Helper function for making authenticated requests
const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'x-auth-token': token } : {}),
    ...options.headers
  };

  try {
    return await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Invalid email or password');
    }
    
    const data = await response.json();
    
    // Store token and user in localStorage
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
    
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(name: string, email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store token and user in localStorage
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
    
    return data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  // Clear local storage
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem(TOKEN_KEY);
  const userJson = localStorage.getItem(STORAGE_KEY);
  
  if (!token || !userJson) {
    return null;
  }
  
  try {
    // Validate token by fetching current user
    const response = await authFetch('/auth/me');
    
    if (!response.ok) {
      // Token is invalid, clear storage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    
    // Return stored user
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/auth/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get all users error:', error);
    return [];
  }
}

export async function getUser(userId: string): Promise<User | null> {
  if (!userId) {
    console.error('getUser called with no userId');
    return null;
  }
  
  try {
    // Add console logs to track the request
    console.log(`Fetching user with ID: ${userId}`);
    console.log(`API URL: ${API_URL}/auth/users/${userId}`);
    
    const response = await fetch(`${API_URL}/auth/users/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('User fetch error response:', errorData);
      throw new Error(`Failed to fetch user: ${errorData.msg || response.statusText}`);
    }
    
    const userData = await response.json();
    console.log('User data received:', userData);
    return userData;
  } catch (error) {
    console.error('Get user error:', error);
    // Return a mock user for development if real API is unavailable
    if (import.meta.env.DEV && (!API_URL.includes('localhost') || !window.navigator.onLine)) {
      console.log('Using mock user data for development');
      return {
        id: userId,
        name: 'Demo User',
        email: 'demo@example.com'
      };
    }
    throw error;
  }
}
