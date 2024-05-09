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

  log(data: Logger) {
    // Use the logTypeColors to set the title color and the color for the message
    const { color, weight, showTime, message, log, title } = data;
    const titleColor = this.logTypeColors[data.log];
    const messageColor = color || 'black';
    const messageWeight = weight || 'normal';
    const titleMessage = `%c[${data.title || data.log}]`;
    const titleStyle = `color: ${titleColor}; font-weight: bold;`;

    if (typeof data.message === 'string') {
      const message = ` %c${data.message}`;
      const messageStyle = `color: ${messageColor}; font-weight: ${messageWeight};`;
      console[data.log](titleMessage + message, titleStyle, messageStyle);
      return;
    }

    console[data.log](titleMessage, titleStyle, message);
  }
}
