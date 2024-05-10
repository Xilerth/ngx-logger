/**
 * Logger interface
 * @description Logger interface
 * @interface Logger
 * @property {any} message - message to log
 * @property {LoggerType} log - type of log
 * @property {string} [title] - title of log
 * @property {string} [color] - color of log
 * @property {string} [weight] - weight of log
 * @property {boolean} [showTime] - show time of log
 * @property {boolean} [enabled] - enable log
 */
export interface Logger {
  message: any;
  log: LoggerType;
  title?: string;
  color?: string;
  weight?: string;
  showTime?: boolean;
  enabled?: boolean;
}

/**
 * LoggerType
 * @description LoggerType
 * @type LoggerType
 * @property {string} warn - warn
 * @property {string} error - error
 * @property {string} info - info
 * @property {string} log - log
 * @property {string} table - table
 * @property {string} dir - dir
 */
export type LoggerType = 'warn' | 'error' | 'info' | 'log' | 'table';
