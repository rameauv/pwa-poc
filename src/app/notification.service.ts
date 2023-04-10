import {Injectable, Optional} from '@angular/core';
import {Messaging, onMessage, getToken, isSupported} from "@angular/fire/messaging";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private isInitialized = false;

  constructor(@Optional() private messaging: Messaging) {
  }

  async init() {
    if (this.isPushApiSupported()) {
      console.log('web push not supported');
    }
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
    console.log('check permissions');
    try {
      const res = await navigator.permissions.query({name: "notifications"})
      if (res.state !== 'granted') {
        console.log('no notif permission')
        return;
      }
    } catch (e: unknown) {
      console.log(e)
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

    console.log('init firebase')

    // const app = initializeApp(firebaseConfig);
    // const messaging = getMessaging(app);

    console.log('firebase init done')

    const broadcast = new BroadcastChannel('myAppChannel');
    broadcast.onmessage = message => {
      console.log('background message');
      console.log(message.data);
    };

    console.log('register service worker')

    const serviceWorkerRegistration = await navigator.serviceWorker.register('firebase-messaging-sw.bundled.js', {
      type: 'module',
      scope: '__'
    });
    await serviceWorkerRegistration.pushManager.getSubscription()
    console.log()
    console.log('service worker registered');
    console.log(serviceWorkerRegistration);
    const token = await getToken(this.messaging, {
      serviceWorkerRegistration: serviceWorkerRegistration,
      vapidKey: 'BJrcLaMSbKopriha862sKRWuRh6CsmaXTUAejNQZzhqXGrLLLcvDEPAkBRVBaTdOSWVMWYszpke2BlfBKYmdlus',
    });
    console.log(token);

    onMessage(this.messaging, payload => {
      console.log('foreground message');
      console.log(payload);
    });
    this.isInitialized = true;
    return token;
  }

  isPushApiSupported() {
    return 'PushManager' in window;
  }

}
