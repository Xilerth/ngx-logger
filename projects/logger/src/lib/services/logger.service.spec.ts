import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { Logger } from '../models/logger.interface';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log a message', () => {
    const spy = spyOn(console, 'log');
    const data: Logger = {
      message: 'initialized',
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      disabled: false,
      title: 'AppComponent',
    };
    service.log(data);
    const titleColor = service['logTypeColors'][data.log];
    const messageColor = data.color;
    const messageWeight = data.weight || 'normal';
    const titleMessage = `[${data.title || data.log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;
    const time = data.showTime ? `(${new Date().toLocaleTimeString()})` : '';
    const message = `${data.message}`;
    const messageStyle = `color: ${messageColor}; font-weight: ${messageWeight};`;
    const messageToLog = `%c${time}${titleMessage} %c${message}`;
    expect(spy).toHaveBeenCalledWith(messageToLog, titleStyle, messageStyle);
  });

  it('should disable a specific log type', () => {
    const logType = 'info';
    service.disableLog(logType);
    expect(service['visibleLogs'][logType]).toBe(false);
  });

  it('should enable a specific log type', () => {
    const logType = 'info';
    service.enableLog(logType);
    expect(service['visibleLogs'][logType]).toBe(true);
  });

  it('should disable all log types', () => {
    service.disableAllLogs();
    Object.keys(service['visibleLogs']).forEach((key) => {
      expect(service['visibleLogs'][key]).toBe(false);
    });
  });

  it('should enable all log types', () => {
    service.enableAllLogs();
    Object.keys(service['visibleLogs']).forEach((key) => {
      expect(service['visibleLogs'][key]).toBe(true);
    });
  });

  it('should enable save log for a specific log type', () => {
    const logType = 'info';
    service.enableSaveLog(logType);
    expect(service['saveLogsRecord'][logType]).toBe(true);
  });

  it('should disable save log for a specific log type', () => {
    const logType = 'info';
    service.disableSaveLog(logType);
    expect(service['saveLogsRecord'][logType]).toBe(false);
  });

  it('should get the status of all log types', () => {
    const logsStatus = service.getLogsStatus();
    expect(logsStatus).toEqual(service['visibleLogs']);
  });

  it('should get all logs saved', () => {
    const logs = service.logRecords$.subscribe((data) => {
      return expect(data).toEqual(service['logger']);
    });
    logs.unsubscribe();
  });

  it('should clear all logs', () => {
    const logs = service.logRecords$.subscribe((data) => {
      expect(data).toEqual(service['logger']);
    });
    logs.unsubscribe();
  });

  it('should check if log is globally enabled', () => {
    const logType = 'info';
    const result = service['checkIfLogIsGlobalEnabled'](logType);
    expect(result).toBe(service['visibleLogs'][logType]);
  });

  it('should check if log can be saved', () => {
    const logType = 'info';
    const result = service['checkIfLogCanBeSaved'](logType);
    expect(result).toBe(service['saveLogsRecord'][logType]);
  });

  it('show save a log', () => {
    const logType = 'info';
    service.enableSaveLog(logType);

    const data: Logger = {
      message: 'initialized',
      log: 'info',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      disabled: false,
      title: 'AppComponent',
    };

    service.log(data);
    expect(service['logger']).toEqual(data);
  });

  it('should message not a string', () => {
    const spy = spyOn(console, 'log');
    const data: Logger = {
      message: ['123'],
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: false,
      disabled: false,
      title: 'AppComponent',
    };
    service.log(data);
    const titleColor = service['logTypeColors'][data.log];
    const titleMessage = `[${data.title || data.log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;
    const time = data.showTime ? `(${new Date().toLocaleTimeString()})` : '';
    const titleLog = `%c${time} ${titleMessage}`;

    expect(spy).toHaveBeenCalledWith(titleLog, titleStyle, data.message);
  });

  it('should message default data', () => {
    const spy = spyOn(console, 'log');
    const data: Logger = {
      message: ['123'],
      log: 'log',
      color: 'lightPink',
      disabled: false,
    };
    service.log(data);
    const titleColor = service['logTypeColors'][data.log];
    const titleMessage = `[${data.log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;
    const time = '';
    const titleLog = `%c${time} ${titleMessage}`;

    expect(spy).toHaveBeenCalledWith(titleLog, titleStyle, data.message);
  });

  it('should not global log enabled', () => {
    const logType = 'info';
    service.disableLog(logType);
    const result = service['checkIfLogIsGlobalEnabled'](logType);
    const spy = spyOn(console, 'log');
    const data: Logger = {
      message: 'initialized',
      log: 'info',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      disabled: false,
      title: 'AppComponent',
    };

    service.log(data);
    expect(result).toBe(false);
  });

  it('should not enabled log', () => {
    const data: Logger = {
      message: 'initialized',
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      disabled: true,
      title: 'AppComponent',
    };
    const spy = spyOn(console, 'log');
    service.log(data);
    expect(spy).not.toHaveBeenCalled();
  });

  // it('should get logger List', () => {
  //   const log: Logger = {
  //     message: 'initialized',
  //     log: 'log',
  //     color: 'lightPink',
  //     weight: 'bold',
  //     showTime: true,
  //     disabled: false,
  //     title: 'AppComponent',
  //   };

  //   //enable save for log
  //   service.enableSaveLog('log');

  //   service.log(log);
  //   service.log(log);

  //   expect(service.loggerList).toEqual([log, log]);
  // });
  it('should get logger List', () => {
    const log: Logger = {
      message: 'initialized',
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      disabled: false,
      title: 'AppComponent',
    };
    //enable save for log
    service.enableSaveLog('log');

    service.log(log);
    service.log(log);

    expect(service.loggerList).toEqual([log, log]);

  });
});
