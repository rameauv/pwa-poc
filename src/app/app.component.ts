import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'myPwaApp';

  constructor(
    private notificationService: NotificationService,
  ) {
    // the service to check if the browser support the required API, ask the permission to use the notification if the permission is not already granted
    // and initialize the required resources (service-worker, listeners, etc...)
    // if the user doesn't give the permission to use the notification it will throw a NotificationPermissionDeniedError error
    // if the browser doesn't support the required API, it will throw a NotificationNotSupportedError error
    this.notificationService.init();
  }

  // safari doesn't allow requesting for permission without a user interaction, so there must be a button
  allowNotifications() {
    this.notificationService.init();
  }

  unInitNotifications() {
    this.notificationService.uninit();
  }
}
