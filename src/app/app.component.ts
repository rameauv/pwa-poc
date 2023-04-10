import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import {NotificationService} from "./notification.service";
import {Messaging} from "@angular/fire/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'myPwaApp';

  // readonly VAPID_PUBLIC_KEY = 'BEw7KnqFvpaG-66b9zNX8pHwIbxT4cIqFVqJ8sv9DWjQU_HymroL21b2tDkUwzv_hqN1na3h4WLn3Ueqcq5ysw4';

  // webPushSubscription?: PushSubscription = undefined;

  readonly notificationPayload = {
    notification: {
      title: "Angular News",
      body: "Newsletter Available!",
      icon: "assets/icons/icon-72x72.png",
      vibrate: [100, 50, 2000],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: "explore",
          title: "Go to the site"
        },
        {
          action: "explore2",
          title: "Go to the site"
        },
        {
          action: "explore4",
          title: "Go to the site"
        },
      ]
    },
    requireInteraction: true
  };

  token?: string;

  constructor(private notificationService: NotificationService, @Optional() private messaging: Messaging) {
    // this.swPushService.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    //
    // }).then(sub => {
    //   console.log(sub);
    //   this.webPushSubscription = sub;
    // }).catch(console.error);
    //
    // this.swPushService.notificationClicks.subscribe(console.log)
  }

  async allowNotifications() {
    if (this.token) {
      return;
    }
    await this.requestPermission();
    try {
      this.token = await this.notificationService.init();
      if (this.messaging) {
        onMessage(this.messaging, payload => {
          console.log('foreground message');
          console.log(payload);
        });
      }
    } catch (e) {
      console.error(e)
    }
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
    const payload = this.notificationPayload;
    const delay = 0;
    const ttl = 12;

    fetch('http://localhost:3000/sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        token: this.token,
        payload: payload
      })
    })

    //  fetch('http://localhost:3000/sendNotification', {
    //    method: 'post',
    //    headers: {
    //      'Content-type': 'application/json'
    //    },
    //    body: JSON.stringify({
    //      subscription: this.webPushSubscription,
    //      payload: payload,
    //      delay: delay,
    //      ttl: ttl
    //    })
    //  })
  }
}
