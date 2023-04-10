import {Injectable} from '@angular/core';
import {SwPush} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private isInitialized = false;
  private readonly vapidKey: string;
  private subscription?: PushSubscription;

  constructor(private swPush: SwPush) {
    // in the env
    this.vapidKey = 'BJrcLaMSbKopriha862sKRWuRh6CsmaXTUAejNQZzhqXGrLLLcvDEPAkBRVBaTdOSWVMWYszpke2BlfBKYmdlus';
  }

  // call this methode right after signing-in
  async init() {
    console.log('init')
    if (this.isInitialized) {
      return;
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return;
      }
    }

    this.subscription = await this.swPush.requestSubscription({
      serverPublicKey: this.vapidKey
    });
    console.log(this.subscription.endpoint);
    console.log(this.subscription.toJSON()); // save the endpoint and keys alongside the associated user id and a timestamps

    this.isInitialized = true;
  }

  // call this methode to clean resources used by this service (when signing-out, so that the user doesn't keep receiving notification while being logged-out)
  async uninit() {
    await this.subscription?.unsubscribe();
    this.isInitialized = false;
  }
}
