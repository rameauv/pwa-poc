export class NotificationPermissionDeniedError extends Error {
  constructor() {
    super('The permission to use notification was denied by the user');
  }

}