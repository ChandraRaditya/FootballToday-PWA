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
   "endpoint": "https://fcm.googleapis.com/fcm/send/fNNg_XQ5OQ0:APA91bEjdNRMrOx9lOK4TGaEB3bjv6s_p4bSwTFzO6mv0jW_oJ4AZaiaF3iiOuz6cVF77kH1dfpx_D5WZi1tffaHCVFzBBzt67YDKzK2EcrY6XjJTDv_LCzes4FsXU9cPAwWorFh9fKv",
   "keys": {
       "p256dh": "BBucZ/qJW7Ya7zMwlAq38a5syxNajDYmxalIqtjYckJZqExb6A4xQeOwBw0TPPrbRnpOeHQCwvIkK+4aSMNzIps=",
       "auth": "306dTlAO/1SVjPxt63JakQ=="
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