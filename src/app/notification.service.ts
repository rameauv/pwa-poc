import {Injectable, Optional} from '@angular/core';
import {Messaging, onMessage, getToken, isSupported} from "@angular/fire/messaging";
import {SwPush} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private isInitialized = false;
  private readonly version = "v20";

  constructor(@Optional() private messaging: Messaging, private swPush: SwPush) {
    console.log('register service worker')
  }

  async init() {

    // const res = await Notification.requestPermission();
    // if (res !== 'granted') {
    //   console.log('user refused notifications');
    //   return;
    // }
    if (!(await isSupported())) {
      console.log('web push not supported');
      return;
    }
    if (!this.messaging) {
      console.log('web push not supported');
    }
    console.log('init')
    if (this.isInitialized) {
      console.log('already init');
      return;
    }

    const firebaseConfig = {
      apiKey: "AIzaSyCVAJW3tVsuSiz7e-n8sU1oe9Xj9KpePBg",
      authDomain: "newagent-56df9.firebaseapp.com",
      databaseURL: "https://newagent-56df9.firebaseio.com",
      projectId: "newagent-56df9",
      storageBucket: "newagent-56df9.appspot.com",
      messagingSenderId: "804703330859",
      appId: "1:804703330859:web:81a1cddea349b36aa5c06e"
    };

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('notification permission denied');
        return;
      }
    }
    let token = undefined;
    const serviceWorkerRegistration = await navigator.serviceWorker.register('firebase-messaging-sw.bundled.js?v=' + this.version, {
      type: 'module',
      scope: '__'
    });
    console.log('service worker registered');
    console.log(serviceWorkerRegistration);
    token = await getToken(this.messaging, {
      serviceWorkerRegistration: serviceWorkerRegistration,
      vapidKey: 'BJrcLaMSbKopriha862sKRWuRh6CsmaXTUAejNQZzhqXGrLLLcvDEPAkBRVBaTdOSWVMWYszpke2BlfBKYmdlus',
    });
    console.log(token);

    onMessage(this.messaging, async payload => {
      console.log('foreground message');
      console.log(payload);
      const notificationPayload = payload.notification;
      if (!notificationPayload) {
        console.log('no notification payload');
        return;
      }
      const ngsw = await this.getNgsw();
      await ngsw?.showNotification(notificationPayload.title ?? '', notificationPayload);
    });

    this.isInitialized = true;
    return token;
  }

  async reset() {
    const serviceWorker = await this.getFirebaseSw();
    await serviceWorker?.update();
    // this.isInitialized = false;
    // await this.init();
  }

  async getFirebaseSw() {
    const workers = await navigator.serviceWorker.getRegistrations();
    console.log(workers);
    const worker = workers.find(worker => worker.scope.includes('__'));
    return worker
  }

  async getNgsw() {
    return navigator.serviceWorker.getRegistration('/')
  }

}
