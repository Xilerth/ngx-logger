import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'logger';

  private logService: LoggerService = inject(LoggerService);

  constructor() {
    this.logService.log({
      message: 'This data is a string',
      log: 'table',
      color: 'lightPink',
      weight: 'bold',
      showTime: true,
      enabled: true,
      title: 'AppComponent',
    });

    this.logService.log({
      message: 'AppComponent constructor',
      log: 'error',

      showTime: false,
    });

    this.logService.log({
      message: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ],
      log: 'warn',
      color: 'red',
      weight: 'bold',
      showTime: true,
      enabled: false,
    });

    this.logService.log({
      message: 'AppComponent constructor',
      log: 'log',
      color: 'purple',
      weight: 'bold',
      showTime: false,
      enabled: true,
    });

    this.logService.log({
      message: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ],
      log: 'table',
      color: 'red',
      weight: 'bold',
      showTime: true,
    });
  }
}
