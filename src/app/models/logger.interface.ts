export interface Logger {
  message: any;
  log: 'warn' | 'error' | 'info' | 'log' | 'table' | 'dir';
  title?: string;
  color?: string;
  weight?: string;
  showTime?: boolean;
  enabled?: boolean;
}
