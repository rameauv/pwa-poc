import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getMessaging, provideMessaging} from "@angular/fire/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCVAJW3tVsuSiz7e-n8sU1oe9Xj9KpePBg",
  authDomain: "newagent-56df9.firebaseapp.com",
  databaseURL: "https://newagent-56df9.firebaseio.com",
  projectId: "newagent-56df9",
  storageBucket: "newagent-56df9.appspot.com",
  messagingSenderId: "804703330859",
  appId: "1:804703330859:web:81a1cddea349b36aa5c06e"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // AngularFireModule,
    // AngularFireMessagingModule
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideMessaging(() => getMessaging()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
