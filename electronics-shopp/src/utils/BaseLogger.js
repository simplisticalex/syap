export class BaseLogger {
  log(msg, data) {
    // eslint-disable-next-line no-console
    console.log(msg, data ?? "");
  }
}
