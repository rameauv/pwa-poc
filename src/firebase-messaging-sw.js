import {initializeApp} from "firebase/app";
import {getMessaging, onBackgroundMessage} from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyCVAJW3tVsuSiz7e-n8sU1oe9Xj9KpePBg",
  authDomain: "newagent-56df9.firebaseapp.com",
  databaseURL: "https://newagent-56df9.firebaseio.com",
  projectId: "newagent-56df9",
  storageBucket: "newagent-56df9.appspot.com",
  messagingSenderId: "804703330859",
  appId: "1:804703330859:web:81a1cddea349b36aa5c06e"
};

// isSupported().then(isSupported => {
// if (!isSupported) {
//   console.log('web push is not supported')
//   return;
// }

console.log('v20');

const messaging = getMessaging(initializeApp(firebaseConfig));

const broadcast = new BroadcastChannel('myAppChannel');

onBackgroundMessage(messaging, payload => {
  console.log(payload);
  broadcast.postMessage(payload);
});
// })

self.addEventListener('updatefound', () => {})
