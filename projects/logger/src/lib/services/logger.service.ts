import { Injectable } from '@angular/core';
import { Logger, LoggerType } from '../models/logger.interface';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logTypeColors: {
    [key: string]: string;
  } = {
    info: 'lightblue',
    warn: 'orange',
    error: 'crimson',
    log: 'grey',
    table: 'green',
  };

  private colorKey = '%c';
  private visibleLogs: {
    [key: string]: boolean;
  } = {
    info: true,
    warn: true,
    error: true,
    log: true,
    table: true,
  };

  private saveLogsRecord = {
    info: false,
    warn: false,
    error: false,
    log: false,
    table: false,
  };

  private logger$: BehaviorSubject<Logger[]> = new BehaviorSubject<Logger[]>(
    []
  );

  /**
   *
   * @param data
   * Logger
   * @description Log a message
   * @example
   * this.logService.log({
   * message: 'initialized
   * log: 'log',
   * color: 'lightPink',
   * weight: 'bold',
   * showTime: true,
   * enabled: true,
   * title: 'AppComponent',
   * });
   * @returns void
   */
  public log(data: Logger) {
    const { color, weight, showTime, message, log, title, enabled } = data;
    if (!this.checkIfLogIsGlobalEnabled(log)) {
      return;
    }
    if (!enabled) {
      return;
    }
    const titleColor = this.logTypeColors[log];
    const messageColor = color;
    const messageWeight = weight || 'normal';
    const titleMessage = `[${title || log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;
    const time = showTime ? `(${new Date().toLocaleTimeString()})` : '';

    if (this.checkIfLogCanBeSaved(log)) {
      this.logger = data;
    }

    if (typeof data.message === 'string') {
      const message = `${data.message}`;
      const messageStyle = `color: ${messageColor}; font-weight: ${messageWeight};`;
      const messageToLog = `${this.colorKey}${time}${titleMessage} ${this.colorKey}${message}`;
      console[data.log](messageToLog, titleStyle, messageStyle);
      return;
    }
    const titleLog = `${this.colorKey}${time} ${titleMessage}`;

    console[data.log](titleLog, titleStyle, message);
  }

  /**
   *
   * @param logType
   * 'info' | 'warn' | 'error' | 'log' | 'table'
   * @description Disable a specific log type
   * @example
   * this.logService.disableLog('info');
   * @default enabled: true
   * @returns void
   */
  public disableLog(logType: LoggerType) {
    this.visibleLogs[logType] = false;
  }

  /**
   *
   * @param logType
   * 'info' | 'warn' | 'error' | 'log' | 'table'
   * @description Enable a specific log type
   * @example
   * this.logService.enableLog('info');
   * @default enabled: false
   * @returns void
   */
  public enableLog(logType: LoggerType) {
    this.visibleLogs[logType] = true;
  }

  /**
   *
   * @description Disable all log types
   * @example
   * this.logService.disableAllLogs();
   * @default enabled: true
   * @returns void
   */
  public disableAllLogs() {
    Object.keys(this.visibleLogs).forEach((key) => {
      this.visibleLogs[key] = false;
    });
  }

  /**
   *
   * @description Enable all log types
   * @example
   * this.logService.enableAllLogs();
   * @default enabled: false
   * @returns void
   */
  public enableAllLogs() {
    Object.keys(this.visibleLogs).forEach((key) => {
      this.visibleLogs[key] = true;
    });
  }

  /**
   *
   * @param logType
   * 'info' | 'warn' | 'error' | 'log' | 'table'
   * @description Save a specific log type
   * @example
   * this.logService.enableSaveLog('info');
   * @default enabled: false
   * @returns void
   */
  public enableSaveLog(logType: LoggerType) {
    this.saveLogsRecord[logType] = true;
  }

  /**
   *
   * @param logType
   * 'info' | 'warn' | 'error' | 'log' | 'table'
   * @description Disable a specific log type
   * @example
   * this.logService.disableSaveLog('info');
   * @default enabled: false
   * @returns void
   */
  public disableSaveLog(logType: LoggerType) {
    this.saveLogsRecord[logType] = false;
  }

  /**
   *
   * @description Get the status of all log types
   * @example
   * this.logService.getLogsStatus();
   * @returns { [key: string]: boolean }
   */
  public getLogsStatus() {
    return this.visibleLogs;
  }

  /**
   *
   * @description Get all logs saved
   * @example
   * this.logService.getLogs();
   * @returns Observable<Logger[]>
   */
  public get logRecords$(): Observable<Logger[]> {
    return this.logger$.asObservable();
  }

  /**
   *
   * @description Clear all logs
   * @example
   * this.logService.clearLogs();
   * @returns void
   */
  private set logger(log: Logger) {
    this.logger$.next([...this.logger$.value, log]);
  }

  /**
   * @description Get all logs
   * @example
   * this.logger;
   * @returns Logger[]
   */
  private get logger(): Logger[] {
    return this.logger$.value;
  }

  /**
   *
   * @param log
   * @returns
   * @description Check if log is enabled
   * @example
   * this.checkIfLogIsGlobalEnabled('info');
   * @returns boolean
   */
  private checkIfLogIsGlobalEnabled(log: LoggerType) {
    return this.visibleLogs[log];
  }

  /**
   *
   * @param log
   * @returns
   * @description Check if log can be saved
   * @example
   * this.checkIfLogCanBeSaved('info');
   * @returns boolean
   */
  private checkIfLogCanBeSaved(log: LoggerType) {
    return this.saveLogsRecord[log];
  }
}
