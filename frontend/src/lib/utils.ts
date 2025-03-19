
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format a date string to "DD Month YYYY" format
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Simulate API delay
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get a background color for a report card based on day number
export function getReportCardColor(day: number) {
  const colors = [
    'bg-gradient-to-br from-indigo-400 to-purple-500', // day 1
    'bg-gradient-to-br from-yellow-400 to-orange-500', // day 2
    'bg-gradient-to-br from-red-400 to-pink-500',      // day 3
    'bg-gradient-to-br from-green-400 to-teal-500',    // day 4
    'bg-gradient-to-br from-blue-400 to-cyan-500',     // day 5
    'bg-gradient-to-br from-violet-400 to-fuchsia-500' // day 6
  ];
  
  // Cycle through colors if day number exceeds available colors
  return colors[(day - 1) % colors.length];
}

