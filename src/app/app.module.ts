import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getMessaging, provideMessaging} from "@angular/fire/messaging";

const firebaseConfig = {
  apiKey: process.env.NG_APP_API_KEY,
  authDomain: process.env.NG_APP_AUTH_DOMAIN,
  projectId: process.env.NG_APP_PROJECT_ID,
  messagingSenderId: process.env.NG_APP_MESSAGING_SENDER_ID,
  appId: process.env.NG_APP_APP_ID
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideMessaging(() => getMessaging()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
