/**
 * Format date to Indonesian locale with custom options
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return dateObj.toLocaleDateString("id-ID", options || defaultOptions);
}

/**
 * Format time to Indonesian locale
 */
export function formatTime(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return dateObj.toLocaleTimeString("id-ID", options || defaultOptions);
}

/**
 * Format date and time to Indonesian locale
 */
export function formatDateTime(
  date: string | Date,
  dateOptions?: Intl.DateTimeFormatOptions,
  timeOptions?: Intl.DateTimeFormatOptions
): { date: string; time: string } {
  return {
    date: formatDate(date, dateOptions),
    time: formatTime(date, timeOptions),
  };
}

/**
 * Format full date with time in a single string
 */
export function formatFullDateTime(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return dateObj.toLocaleString("id-ID", options || defaultOptions);
}
