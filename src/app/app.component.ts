import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Logger, LoggerService } from '../../projects/logger/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'logger';
  public logs: Logger[] = [];
  private logService: LoggerService = inject(LoggerService);

  constructor() {
    this.logService.logRecords$.subscribe((log: Logger | null) => {
      if (!log) {
        return;
      }
      this.logs = [...this.logs, log];
    });

    this.logService.enableSaveLog('log');
    this.logService.enableSaveLog('info');
    this.logService.enableSaveLog('warn');
    this.logService.enableSaveLog('error');
    this.logService.enableSaveLog('table');

    // setInterval(() => {
    this.logService.log({
      message: 'Welcome to Logger Library',
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: '@Xilerth/Logger Library',
    });
    // }, 1000);
  }

  logInfo() {
    this.logService.log({
      message: 'This is an info message',
      log: 'info',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: 'This could be useful',
    });
  }

  logWarn() {
    this.logService.log({
      message: 'This is a warning message',
      log: 'warn',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: 'Be careful!',
    });
  }

  logError() {
    this.logService.log({
      message: 'This is an error message',
      log: 'error',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: 'Ups! something went wrong',
    });
  }

  logTable() {
    this.logService.log({
      message: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'John Smith' },
      ],
      log: 'table',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: 'Table of users',
    });
  }

  log() {
    this.logService.log({
      message:
        'This is a simple log message, you can log anything you want here!',
      log: 'log',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      title: 'Simple log',
    });
  }
}
