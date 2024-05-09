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
      message: 'AppComponent constructor',
      log: 'info',
      color: 'red',
      weight: 'bold',
      showTime: true,
    });

    this.logService.log({
      message: 'AppComponent constructor',
      log: 'error',
      color: 'red',
      weight: 'bold',
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
    });

    this.logService.log({
      message: 'AppComponent constructor',
      log: 'log',
      color: 'red',
      weight: 'bold',
      showTime: false,
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
