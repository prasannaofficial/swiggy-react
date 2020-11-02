import firebase from "firebase/app";
import "firebase/messaging";

import { backendLink } from "./constants";

const config = {
  apiKey: "AIzaSyDy84Odz4ba7xZsbGs3I_dGZoNBArY-pTA",
  authDomain: "fir-cloud-messaging-c7269.firebaseapp.com",
  databaseURL: "https://fir-cloud-messaging-c7269.firebaseio.com",
  projectId: "fir-cloud-messaging-c7269",
  storageBucket: "fir-cloud-messaging-c7269.appspot.com",
  messagingSenderId: "988005981321",
  appId: "1:988005981321:web:a301c772d5bac15c5dfa58",
};

// const config = {
//   apiKey: 'AIzaSyD6n58WMRzrcXxMnDGvzttxk4lqNu0MZbI',
//   authDomain: 'push-notifications-article.firebaseapp.com',
//   databaseURL: 'https://push-notifications-article.firebaseio.com',
//   projectId: 'push-notifications-article',
//   storageBucket: 'push-notifications-article.appspot.com',
//   messagingSenderId: '607164875245',
//   appId: '1:607164875245:web:ac22e68ecfd336b8ad67e4',
// };

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log(payload);
});

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() =>
        messaging
          .getToken({
            vapidKey:
              "BPYLfa40KZKeQaaXw-9YZzoCiXRfGA16IDdx7csGTCsoQXWRKZH3Y4OFK0Xr2NOZNlFSHgxe_LwuYokPrkXLwgo",
          })
          .then((firebaseToken) => {
            let myHeaders = new Headers();
            myHeaders.append("x-access-token", localStorage.getItem("token"));
            var urlencoded = new URLSearchParams();
            urlencoded.append("fcmtoken", firebaseToken);
            fetch(backendLink + "/fcm/settoken", {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success === true) {
                  resolve(firebaseToken);
                }
              });
          })
      )
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log(payload);
      resolve(payload);
    });
  });
