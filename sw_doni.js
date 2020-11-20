importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if (workbox) {
  console.log("workbox berhasil dimuat");
} else {
  console.log("workbox gagal dimuat");
}


//precaching
workbox.precaching.precacheAndRoute(
[
  {url : '/PWA-submission3/index.html', revision: '1'},
  {url : '/PWA-submission3/jadwal_view.html', revision: '1'},
  {url : '/PWA-submission3/nav.html', revision: '1'},
  {url : '/PWA-submission3/manifest.json', revision: '1'},
  {url : '/PWA-submission3/register.js', revision: '1'},
  {url : "/PWA-submission3/css/materialize.min.css", revision: '1'},
  {url : "/PWA-submission3/css/card.css", revision: '1'},
  {url : "/PWA-submission3/js/materialize.min.js", revision: '1'},
  {url : "/PWA-submission3/js/nav.js", revision: '1'},
  {url : "/PWA-submission3/js/api.js", revision: '1'},
  {url : "/PWA-submission3/js/idb.js", revision: '1'},
  {url : "/PWA-submission3/js/db.js", revision: '1'},
],
{
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/],
}
);


const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, NetworkFirst, CacheFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

//register all logo in logos folder with cachefirst strategies
workbox.routing.registerRoute(
  new RegExp('/PWA-submission3/logos/'),
new CacheFirst({
    cacheName: 'futbalmania-logos',
  })
);


//register all image in img folder with cachefirst strategiest
workbox.routing.registerRoute(
    new RegExp('/PWA-submission3/img/'),
new CacheFirst({
  cacheName: 'futballmania-img',
})
)

//register materialize font stylesheets using staleWhileRevalidate strategies
workbox.routing.registerRoute(
  "https://fonts.googleapis.com/icon?family=Material+Icons",
new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

//register icon using cachefirst
workbox.routing.registerRoute(
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
new CacheFirst({
  cacheName: 'materialize-icons', //cache name
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

//register all file in pages folder using staleWhileRevalidate strategies
workbox.routing.registerRoute(
  new RegExp('/PWA-submission3/pages/'),
new StaleWhileRevalidate({
    cacheName: "pages"
  })
)

//register api using staleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
new StaleWhileRevalidate({
  cacheName: 'football-data.org',
})
)


self.addEventListener("push", event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload"
  }
  const options = {
    body: body,
    icon: "logos/logo512x512.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification("push Notification", options)
  );
});