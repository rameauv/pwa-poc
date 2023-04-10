import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {NotificationService} from "./services/notification/notification.service";
import {Messaging} from "@angular/fire/messaging";
import {SwPush, SwUpdate} from "@angular/service-worker";

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
    @Optional() private messaging: Messaging
  ) {
    // the service to check if the browser support the required API, ask the permission to use the notification if the permission is not already granted
    // and initialize the required resources (service-worker, listeners, etc...)
    // if the user doesn't give the permission to use the notification it will throw a NotificationPermissionDeniedError error
    // if the browser doesn't support the required API, it will throw a NotificationNotSupportedError error
    this.notificationService.init();
  }

  allowNotifications() {
    // safari doesn't allow requesting for permission without a user interaction, so there must be a button
    this.notificationService.init();
  }
}
