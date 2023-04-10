import {Injectable, Optional} from '@angular/core';
import {getToken, Messaging, onMessage, Unsubscribe} from "@angular/fire/messaging";
import {SwPush} from "@angular/service-worker";
import {NotificationNotSupportedError} from "./errors/notification-not-supported-error";
import {NotificationPermissionDeniedError} from "./errors/notification-permission-denied-error";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly vapidKey: string;

  private isInitialized = false;
  private serviceWorkerRegistration?: ServiceWorkerRegistration;
  private onMessageListenerUnsubscriber?: Unsubscribe;
  private swVersion: any;

  constructor(@Optional() private messaging?: Messaging) {
    this.vapidKey = process.env.NG_APP_VAPID_KEY;
    this.swVersion = process.env.NG_APP_FIREBASE_MESSAGING_SW_VERSION;
  }

  // call this methode right after signing-in
  async init() {
    if (this.isInitialized) {
      return;
    }
    if (!this.messaging) {
      throw new NotificationNotSupportedError();
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new NotificationPermissionDeniedError();
      }
    }
    // if the service worker already exist it will return the current service-worker
    this.serviceWorkerRegistration = await navigator.serviceWorker.register(`firebase-messaging-sw.bundled.js?v=${this.swVersion}`, {
      type: 'module',
      scope: '__'
    });

    const token = await getToken(this.messaging, {
      serviceWorkerRegistration: this.serviceWorkerRegistration,
      vapidKey: this.vapidKey,
    });

    this.onMessageListenerUnsubscriber = onMessage(this.messaging, async payload => {
      const notificationPayload = payload.notification;
      if (!notificationPayload) {
        // log the error
        return;
      }
      if (this.serviceWorkerRegistration === undefined) {
        // log the error
        return;
      }
      await this.serviceWorkerRegistration.showNotification(notificationPayload.title ?? '', notificationPayload);
    });

    console.log(token); // save the token on our server with the userid corresponding and a timestamp,

    this.isInitialized = true;
  }

  // call this methode to clean resources used by this service (when signing-out, so that the user doesn't keep receiving notification while being logged-out)
  async uninit() {
    if (this.serviceWorkerRegistration !== undefined) {
      try {
        await this.serviceWorkerRegistration.unregister();
      } catch (error) {
        // log the error
      }
    }
    if (this.onMessageListenerUnsubscriber !== undefined) {
      this.onMessageListenerUnsubscriber();
    }
    this.isInitialized = false;
  }
}
