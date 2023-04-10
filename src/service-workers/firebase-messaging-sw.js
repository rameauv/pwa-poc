import {initializeApp} from "firebase/app";
import {getMessaging, onBackgroundMessage, isSupported} from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: process.env.NG_APP_API_KEY,
  authDomain: process.env.NG_APP_AUTH_DOMAIN,
  projectId: process.env.NG_APP_PROJECT_ID,
  messagingSenderId: process.env.NG_APP_MESSAGING_SENDER_ID,
  appId: process.env.NG_APP_APP_ID
};

// on safari the service-worker is detected as not supporting required API to use the Firebase SDK.

console.log(process.env.NG_APP_FIREBASE_MESSAGING_SW_VERSION);

getMessaging(initializeApp(firebaseConfig));
