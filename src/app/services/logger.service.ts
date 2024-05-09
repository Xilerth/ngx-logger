import { Injectable } from '@angular/core';
import { Logger } from '../models/logger.interface';

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

  log(data: Logger) {
    const { color, weight, showTime, message, log, title, enabled } = data;
    if (!enabled) {
      return;
    }
    const titleColor = this.logTypeColors[log];
    const messageColor = color;
    const messageWeight = weight || 'normal';
    const titleMessage = `[${title || log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;
    const time = showTime ? `(${new Date().toLocaleTimeString()})` : '';

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
}
