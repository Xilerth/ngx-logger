# NGX Logger

## Installation

You can install the ngx-logger package using npm:
`npm install @Xilerth/ngx-logger`

## USE
Import the LoggerService in your component or service:

```
typescript

@Component({
  selector: 'app-my-component',
  template: '<p>My Component</p>',
})
export class MyComponent {
  constructor(private loggerService: LoggerService) {}

  logMessage() {
    this.loggerService.log({
      log: 'info',
      message: 'This is an info message',
    });
  }
}
```

## API

### log(data: Logger)

Logs a message with the specified log type and style.

- `data`: An object containing the following properties:
  - `log`: The log type (e.g., 'info', 'warn', 'error', 'log', 'table').
  - `message`: The message to log.
  - `color`: The color of the message (optional).
  - `weight`: The font weight of the message (optional).
  - `showTime`: Whether to show the timestamp (optional, default: false).
  - `title`: The title of the log message (optional).
  - `enabled`: Whether logging is enabled (optional, default: true).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
