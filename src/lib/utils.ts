
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
    'bg-card-lavender', // day 1
    'bg-card-gold',     // day 2
    'bg-card-coral',    // day 3
    'bg-card-coral',    // day 4
    'bg-card-blue',     // day 5
    'bg-card-cream'     // day 6
  ];
  
  // Cycle through colors if day number exceeds available colors
  return colors[(day - 1) % colors.length];
}
