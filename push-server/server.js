// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
// const webPush = require("web-push");
//
// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log(
//     "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
//       "environment variables. You can use the following ones:"
//   );
//   console.log(webPush.generateVAPIDKeys());
//   return;
// }
// // Set the keys used for encrypting the push messages.
// webPush.setVapidDetails(
//   "https://example.com/",
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const {getMessaging} = require("firebase-admin/messaging");
const serviceAccount = require("./firebase-service-account-private-key.json");

const firebaseConfig = {
  apiKey: "AIzaSyCVAJW3tVsuSiz7e-n8sU1oe9Xj9KpePBg",
  authDomain: "newagent-56df9.firebaseapp.com",
  databaseURL: "https://newagent-56df9.firebaseio.com",
  projectId: "newagent-56df9",
  storageBucket: "newagent-56df9.appspot.com",
  messagingSenderId: "804703330859",
  appId: "1:804703330859:web:81a1cddea349b36aa5c06e"
};

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = getMessaging(app);

module.exports = function (app, route) {
  console.log(route)
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });

  app.post(route + "register", function (req, res) {
    // A real world application would store the subscription info.
    res.sendStatus(201);
  });

  app.post(route + "sendNotification", function (req, res) {
    console.log('send notification');
    const subscription = req.body.subscription;
    // const payload = req.body.payload;
    const token = req.body.token
    const options = {
      TTL: req.body.ttl,
    };

    // console.log(payload)
    console.log(token)
    messaging.send({
      token: token,
      webpush: {
        notification: {
          title: "test notification from firebase"
        }
      }
    }).then(console.log)
      .catch(console.error);
    res.sendStatus(201);
    //   setTimeout(function () {
    //     webPush
    //       .sendNotification(subscription, JSON.stringify(payload), options)
    //       .then(function () {
    //         res.sendStatus(201);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         res.sendStatus(500);
    //       });
    //   }, req.body.delay * 1000);
  });
};
