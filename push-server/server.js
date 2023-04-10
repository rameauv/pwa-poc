const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const {getMessaging} = require("firebase-admin/messaging");
const serviceAccount = require("./firebase-service-account-private-key.json");

const notificationSample = {
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
}

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = getMessaging(app);

module.exports = function (app, route) {
  app.post(route + "sendNotification", function (req, res) {
    const token = req.body.token

    messaging.send({
      token: token,
      webpush: {
        notification: notificationSample
      }
    }).then(() => {
      res.sendStatus(201);
    }).catch((error) => {
      res.sendStatus(500);
    });
  });
};
