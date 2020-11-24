importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');
     
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detail_match.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/main.js', revision: '1' },
    { url: '/detail.js', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/mystyle.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
],
{
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/],
});


const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, NetworkFirst, CacheFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

//register all logo in logos folder with cachefirst strategies
workbox.routing.registerRoute(
  new RegExp('/img/'),
new CacheFirst({
    cacheName: 'footballtoday-image',
  })
);


//register all file in pages folder using staleWhileRevalidate strategies
workbox.routing.registerRoute(
  new RegExp('/pages/'),
new StaleWhileRevalidate({
    cacheName: "pages"
  })
)

//register api using staleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
new StaleWhileRevalidate({
  cacheName: 'football-api',
})
)


workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
new StaleWhileRevalidate({
    cacheName: 'google-web-fonts',
  })
);


workbox.routing.registerRoute(
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
new CacheFirst({
  cacheName: 'materialize-icons',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 365 * 24 * 60 * 60,
      maxEntries: 60,
    }),
  ],
})
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});