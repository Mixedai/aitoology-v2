const isProduction = import.meta.env.PROD;

class Logger {
  private shouldLog: boolean;

  constructor() {
    this.shouldLog = !isProduction;
  }

  log(...args: any[]) {
    if (this.shouldLog) {
      console.log(...args);
    }
  }

  warn(...args: any[]) {
    if (this.shouldLog) {
      console.warn(...args);
    }
  }

  error(...args: any[]) {
    // Always log errors, even in production
    console.error(...args);
  }

  info(...args: any[]) {
    if (this.shouldLog) {
      console.info(...args);
    }
  }

  debug(...args: any[]) {
    if (this.shouldLog) {
      console.debug(...args);
    }
  }

  table(...args: any[]) {
    if (this.shouldLog) {
      console.table(...args);
    }
  }

  time(label: string) {
    if (this.shouldLog) {
      console.time(label);
    }
  }

  timeEnd(label: string) {
    if (this.shouldLog) {
      console.timeEnd(label);
    }
  }
}

export const logger = new Logger();
export default logger;