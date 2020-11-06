importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");

// const logo = require("../src/img/s logo.png");

const config = {
  apiKey: "AIzaSyD6n58WMRzrcXxMnDGvzttxk4lqNu0MZbI",
  authDomain: "push-notifications-article.firebaseapp.com",
  databaseURL: "https://push-notifications-article.firebaseio.com",
  projectId: "push-notifications-article",
  storageBucket: "push-notifications-article.appspot.com",
  messagingSenderId: "607164875245",
  appId: "1:607164875245:web:ac22e68ecfd336b8ad67e4",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// messaging.onMessage((payload) => {
//   console.log("Message received. ", payload);
//   // ...
// });

self.addEventListener("notificationclick", (event) => {
  // console.log(event);
  // return event;

  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/chat" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/chat");
      })
  );
});
