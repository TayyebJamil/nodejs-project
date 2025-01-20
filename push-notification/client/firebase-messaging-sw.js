importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker.
// This is the same config as used in your app
const firebaseConfig = {
  apiKey: "AIzaSyBzU5SAeNP4urVb25ROnKvorJ-g9p1H0fM",
  authDomain: "push-notifications-3ae3e.firebaseapp.com",
  databaseURL: "https://push-notifications-3ae3e-default-rtdb.firebaseio.com",
  projectId: "push-notifications-3ae3e",
  storageBucket: "push-notifications-3ae3e.firebasestorage.app",
  messagingSenderId: "343986576554",
  appId: "1:343986576554:web:b31705b086f0796c44c4d3",
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that you can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
