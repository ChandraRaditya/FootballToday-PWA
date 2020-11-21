var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJ7rYuKOUrfGFVzLZkUvD6mTgTT85CiImG0JVL5bJrFnHP2YCnznzOfJETaHE7Ja5Kjl8nbUBUBx5uvXiZ5hquo",
   "privateKey": "XrdRvIuTyWD-OyXm6q-l2BsX-gDpEjhcTXiN8iZySO4"
};
 
 
webPush.setVapidDetails(
   'mailto:chandraariwiraditya@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dKZJWwqxeA4:APA91bGzqweGFcR5lYkG-eyRG7xt4PMYbFGUX3ty8agC226TSByCOuUEjk2D7CpSz1VLlexLAyNgdck5O2_MEWKD6G_96aP4AR1eAUzCxafRN6wy9ptItCWLI3fTzpQSUF0Yq7bCJPIP",
   "keys": {
       "p256dh": "BA2AXgpLTy/kHYNPEuUuO3EMQndtSGarVb4HSNcvdBYhjuyTEWi9GXBkfqmUzVF9ASVh7Vfu88xX5rKfF/Ekf50=",
       "auth": "RrllaPk4yZfSrLRtA1updw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '166336536809',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);