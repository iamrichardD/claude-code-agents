/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string or date-like string
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${dateString}`);
    return dateString; // Return original string as fallback
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  }).format(date);
}

/**
 * Formats a date string into a compact format
 * @param dateString - ISO date string or date-like string  
 * @returns Compact formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDateCompact(dateString: string): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${dateString}`);
    return dateString;
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}