// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require("web-push");

webPush.setGCMAPIKey('AIzaSyCVAJW3tVsuSiz7e-n8sU1oe9Xj9KpePBg')
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://example.com/",
  'BJrcLaMSbKopriha862sKRWuRh6CsmaXTUAejNQZzhqXGrLLLcvDEPAkBRVBaTdOSWVMWYszpke2BlfBKYmdlus',
  '9TE9UFt29vpxImrEqXVtZg0JoxbFo96UPXml7OB_WD8'
);

const notif = {
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


module.exports = function (app, route) {
  app.post(route + "sendNotification", function (req, res) {
    const subscription = req.body.subscription;
    const options = {
      TTL: req.body.ttl,
    };

    webPush
      .sendNotification(subscription, JSON.stringify({notification: notif}), options)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });
};
