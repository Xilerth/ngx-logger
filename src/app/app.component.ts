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
    this.logService.logRecords$.subscribe((logs: Logger[]) => {
      this.logs = logs;
    });

    // this.logService.enableSaveLog('log');

    setInterval(() => {
      this.logService.log({
        message: 'initialized',
        log: 'log',
        color: 'lightPink',
        weight: 'bold',
        showTime: true,
        enabled: true,
        title: 'AppComponent',
      });
    }, 1000);
  }
}
