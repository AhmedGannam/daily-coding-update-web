
// This is a mock implementation of authentication service
// In a real application, this would interact with your backend API

interface User {
  id: string;
  name: string;
  email: string;
}

// Mock user storage - in a real app, these would be API calls
const STORAGE_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

// Mock users database
let mockUsers: { id: string; name: string; email: string; password: string }[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    password: 'password123'
  }
];

// Simulate backend delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function login(email: string, password: string): Promise<User> {
  await delay(800); // Simulate API call
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Create a user object without the password
  const authenticatedUser = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  
  // Store in localStorage to persist the session
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
  localStorage.setItem(TOKEN_KEY, `mock-jwt-token-${user.id}`);
  
  return authenticatedUser;
}

export async function register(name: string, email: string, password: string): Promise<User> {
  await delay(1000); // Simulate API call
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    password
  };
  
  // Add to mock database
  mockUsers.push(newUser);
  
  // Create a user object without the password
  const authenticatedUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  };
  
  // Store in localStorage to persist the session
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
  localStorage.setItem(TOKEN_KEY, `mock-jwt-token-${newUser.id}`);
  
  return authenticatedUser;
}

export async function logout(): Promise<void> {
  await delay(300); // Simulate API call
  
  // Clear local storage
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  await delay(300); // Simulate API call
  
  const userJson = localStorage.getItem(STORAGE_KEY);
  if (!userJson) {
    return null;
  }
  
  return JSON.parse(userJson) as User;
}

export async function getAllUsers(): Promise<User[]> {
  await delay(500); // Simulate API call
  
  // Return users without passwords
  return mockUsers.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
}

// Mock function to get a specific user
export async function getUser(userId: string): Promise<User | null> {
  await delay(500);
  
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return null;
  
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}
