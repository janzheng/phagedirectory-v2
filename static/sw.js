importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.b25668db58724865ca2c.js",
    "revision": "c89b2adfb4f77454004ea538a0482618"
  },
  {
    "url": "/_nuxt/app.fb294519232ce67052e973c2f30c224c.css",
    "revision": "fb294519232ce67052e973c2f30c224c"
  },
  {
    "url": "/_nuxt/layouts/contentframe.e088751f692ef49fcfbd.js",
    "revision": "06422c006ef74cdd8a21a5c5b9ed469b"
  },
  {
    "url": "/_nuxt/layouts/default.cf5f06a99b8a86bbb3c3.js",
    "revision": "34d080b8d4507c0b5a4787bacf6ecd0d"
  },
  {
    "url": "/_nuxt/manifest.27568c23842e2765d9a5.js",
    "revision": "2464c31567be1765c10aaacac8c21d9b"
  },
  {
    "url": "/_nuxt/pages/about.b05eda287e0007dbfd05.js",
    "revision": "5221deddaf51e508fd636a776b05d45b"
  },
  {
    "url": "/_nuxt/pages/alerts.da9a05702aff66357a98.js",
    "revision": "4675c50a601b002be6ed3dd0e2019c03"
  },
  {
    "url": "/_nuxt/pages/contact.51a80768d599c902de51.js",
    "revision": "7b5860eb0e8b8ffad746ee9e29d00483"
  },
  {
    "url": "/_nuxt/pages/design.b1b683fec66d6187b91a.js",
    "revision": "c0f3cf2a1180b54eb2f90670ba2a651c"
  },
  {
    "url": "/_nuxt/pages/dir.cbe48d3fb2a60741a6e6.js",
    "revision": "243186d4c3a9a15f846374fe0e76fe5d"
  },
  {
    "url": "/_nuxt/pages/emailpage.70c445db41e9687751dd.js",
    "revision": "92f2bcb459ce3e04a00df51e200469a1"
  },
  {
    "url": "/_nuxt/pages/feedback.7c79c821633f666669ce.js",
    "revision": "35352870d2904fa183337f5e482dc93c"
  },
  {
    "url": "/_nuxt/pages/hostgen.1ecedc8c675a9ce20ce6.js",
    "revision": "23ccc5d782be506405f644d11f956dbc"
  },
  {
    "url": "/_nuxt/pages/index.c172573d12463a42b13b.js",
    "revision": "cfaa476d40360f979e5f1a7261ed1f3d"
  },
  {
    "url": "/_nuxt/pages/jobs.ab72806100b32f8b8c00.js",
    "revision": "21f18d1f3003a82bd6c9e9c435b368f1"
  },
  {
    "url": "/_nuxt/pages/join.5781d51ef731f3aac656.js",
    "revision": "3909ffe5a27c1a3a6de0a759592f7289"
  },
  {
    "url": "/_nuxt/pages/news.e97f9b6eedbce20d33b2.js",
    "revision": "c5edeb8509c6f9baf1671d2c834650e6"
  },
  {
    "url": "/_nuxt/pages/newspage.f5a52e6d96ba98072d78.js",
    "revision": "b30783712613c830d47e427a94cb9dce"
  },
  {
    "url": "/_nuxt/pages/orgs.eea925cff6dee5631837.js",
    "revision": "ce9bb59a9dd2f373adcb6ff679beeb0f"
  },
  {
    "url": "/_nuxt/pages/policies.0672c9c1d8e4a9e1ffdc.js",
    "revision": "d3b0f30832d4bfc715d7f938671a34b7"
  },
  {
    "url": "/_nuxt/pages/signedup.e206da26b3f62b1bdfbb.js",
    "revision": "4f2f13add925d97d95988e1854cb09f3"
  },
  {
    "url": "/_nuxt/pages/subscribe.10c19349b02075e5f32e.js",
    "revision": "0e90f6f8b44dc80a1522741ed4363a06"
  },
  {
    "url": "/_nuxt/pages/Test.2ad1a4894ecaa355eccf.js",
    "revision": "f5c680e82349b425062d42d1746460fa"
  },
  {
    "url": "/_nuxt/pages/updates.0d574113d2ec3d1f0c74.js",
    "revision": "9947e2545026e97a65bee9046f6ded69"
  },
  {
    "url": "/_nuxt/vendor.de6a2fa3e3fbb13f5e52.js",
    "revision": "87345358b4969383868fb1040eb1f7ec"
  },
  {
    "url": "/_nuxt/img/ico_rings.2b993ed.png",
    "revision": "2b993edbbcd2d57c7507a149dd93d396"
  },
  {
    "url": "/_nuxt/img/ico.47402d8.png",
    "revision": "47402d81ca669f8d29b3c438902fd847"
  }
], {
  "cacheId": "phagedirectory",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/404.html'])

workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*'), workbox.strategies.cacheFirst({"cacheableResponse":{"statuses":[0,200]}}), 'GET')



// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})


