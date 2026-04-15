// Date Utility Functions for SmartMediConnect
// Automatically generates dates relative to current date

export class DateUtils {
  // Get current date
  static today(): Date {
    return new Date();
  }

  // Get date X days from now
  static daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  // Get date X days ago
  static daysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  // Get date X months from now
  static monthsFromNow(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date;
  }

  // Get date X months ago
  static monthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }

  // Format date as "Feb 14, 2026"
  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Format date as "FEB"
  static formatMonth(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  }

  // Format date as "14"
  static formatDay(date: Date): string {
    return date.getDate().toString();
  }

  // Format date as "February 2026"
  static formatMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  // Format date as "Tomorrow, Feb 15"
  static formatRelativeDate(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if it's today
    if (this.isSameDay(date, today)) {
      return `Today, ${this.formatDate(date).split(',')[0]}`;
    }
    
    // Check if it's tomorrow
    if (this.isSameDay(date, tomorrow)) {
      return `Tomorrow, ${this.formatDate(date).split(',')[0]}`;
    }
    
    // Otherwise return formatted date
    return this.formatDate(date);
  }

  // Check if two dates are the same day
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // Get day name (Mon, Tue, etc)
  static getDayName(date: Date, short: boolean = true): string {
    if (short) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Get relative time string
  static getRelativeTimeString(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return this.formatDate(date);
    }
  }

  // Check if date is in the past
  static isPast(date: Date): boolean {
    return date < new Date();
  }

  // Check if date is in the future
  static isFuture(date: Date): boolean {
    return date > new Date();
  }

  // Generate random time
  static generateRandomTime(): string {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.random() < 0.5 ? '00' : '30';
    const period = Math.random() < 0.5 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${period}`;
  }

  // Generate time range
  static generateTimeRange(startHour: number = 9, durationMinutes: number = 30): string {
    const period1 = startHour >= 12 ? 'PM' : 'AM';
    const hour1 = startHour > 12 ? startHour - 12 : startHour;
    
    const endMinutes = durationMinutes;
    const endHour = startHour + Math.floor(endMinutes / 60);
    const period2 = endHour >= 12 ? 'PM' : 'AM';
    const hour2 = endHour > 12 ? endHour - 12 : endHour;
    
    return `${hour1}:00 ${period1} - ${hour2}:${endMinutes % 60 === 0 ? '00' : endMinutes % 60} ${period2}`;
  }
}
