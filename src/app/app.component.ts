import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {NotificationService} from "./notification.service";
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

  token?: string;

  constructor(
    private notificationService: NotificationService,
    @Optional() private messaging: Messaging,
    private swUpdate: SwUpdate,
  ) {
    this.notificationService.init();
  }

  allowNotifications() {
    // Notification.requestPermission();
    if (this.token) {
      return;
    }
    // this.requestPermission().then(permission => {
    //   console.log(permission);
      this.notificationService.init().then(token => this.token = token)
    // });
  }

  async requestPermission(): Promise<NotificationPermission> {
    console.log('requestPermission')
    try {
      console.log('request perm');
      return Notification.requestPermission();
    } catch (e) {
      console.log('request perm');
      return new Promise((resolve) => {
        Notification.requestPermission(resolve);
      });
    }
  }

  async sendPushNotification() {
    const delay = 0;
    const ttl = 12;

    fetch('http://localhost:3000/sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        token: this.token,
      })
    })
  }

  async checkForAppUpdate() {
    const isNewUpdateAvailable = await this.swUpdate.checkForUpdate()
    if (isNewUpdateAvailable) {
      console.log("new update available");
    } else {
      console.log("no update available");
    }
  }

  async installNewUpdate() {
    const res = await this.swUpdate.activateUpdate();
    if (res) {
      console.log('new version detected');
      await this.notificationService.reset();
      console.log("new version installed");
    } else {
      console.log("no update available");
    }
  }
}
