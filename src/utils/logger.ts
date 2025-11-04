/**
 * Centralized logging utility for the application.
 * Logs are only shown in development mode to keep production clean.
 * 
 * @example
 * import { logger } from './logger';
 * 
 * //logger.log('Debug info'); // Only in development
 * logger.error('Critical error'); // Always shown
 * logger.warn('Warning message'); // Only in development
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

class Logger {
  private isDev = process.env.NODE_ENV !== 'production';

  /**
   * Log a message (only in development)
   */
  // log(...args: unknown[]): void {
  //   if (this.isDev) {
  //     //console.log(...args);
  //   }
  // }

  /**
   * Log a warning (only in development)
   */
  warn(...args: unknown[]): void {
    if (this.isDev) {
      console.warn(...args);
    }
  }

  /**
   * Log an error (always shown, even in production)
   */
  error(...args: unknown[]): void {
    console.error(...args);
  }

  /**
   * Log info (only in development)
   */
  info(...args: unknown[]): void {
    if (this.isDev) {
      console.info(...args);
    }
  }

  /**
   * Log debug information (only in development)
   */
  debug(...args: unknown[]): void {
    if (this.isDev) {
      console.debug(...args);
    }
  }

  /**
   * Log with a specific level
   */
  logWithLevel(level: LogLevel, ...args: unknown[]): void {
    switch (level) {
      case 'log':
        // this.log(...args);
        break;
      case 'warn':
        this.warn(...args);
        break;
      case 'error':
        this.error(...args);
        break;
      case 'info':
        this.info(...args);
        break;
      case 'debug':
        this.debug(...args);
        break;
    }
  }
}

export const logger = new Logger();
