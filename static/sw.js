importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.253071f9d990a91c5714c72ffce0f101.css",
    "revision": "253071f9d990a91c5714c72ffce0f101"
  },
  {
    "url": "/_nuxt/app.cc9790e51a425e5093d4.js",
    "revision": "8c7478e8c8f1e9b0b3d44b7cd982470d"
  },
  {
    "url": "/_nuxt/layouts/contentframe.a74d76e6b7808c8bf028.js",
    "revision": "43ff45dedfa2888e42d875462772be7f"
  },
  {
    "url": "/_nuxt/layouts/default.3cd8d663ae8ec5a69baf.js",
    "revision": "b51efaee0de5d22351de7e0fa24df0ab"
  },
  {
    "url": "/_nuxt/manifest.0bec86b0d6025699859e.js",
    "revision": "df0a6cbf5482d96c1cb40b1bc35f3d50"
  },
  {
    "url": "/_nuxt/pages/about.a848433aae3f10e74a41.js",
    "revision": "ce4256a9f05e0f155999ed8523370b9c"
  },
  {
    "url": "/_nuxt/pages/alerts.4855ca8d2affb6c6d8ed.js",
    "revision": "e29bd85ae0888261cc361a066dd33575"
  },
  {
    "url": "/_nuxt/pages/contact.51a80768d599c902de51.js",
    "revision": "7b5860eb0e8b8ffad746ee9e29d00483"
  },
  {
    "url": "/_nuxt/pages/design.ff2d8b34ab756139f64e.js",
    "revision": "6b61f0049ca702b427bb9bf874a51058"
  },
  {
    "url": "/_nuxt/pages/dir.d8c31e89cc770d4733ed.js",
    "revision": "97c3eb5ad8ca2979597c89bee2fb06ec"
  },
  {
    "url": "/_nuxt/pages/feedback.7c79c821633f666669ce.js",
    "revision": "35352870d2904fa183337f5e482dc93c"
  },
  {
    "url": "/_nuxt/pages/hostgen.f7886aaecd34fd882789.js",
    "revision": "687fa53172a941aa786fe24d7bf610ae"
  },
  {
    "url": "/_nuxt/pages/index.c172573d12463a42b13b.js",
    "revision": "cfaa476d40360f979e5f1a7261ed1f3d"
  },
  {
    "url": "/_nuxt/pages/join.5781d51ef731f3aac656.js",
    "revision": "3909ffe5a27c1a3a6de0a759592f7289"
  },
  {
    "url": "/_nuxt/pages/news.2039696686419ec63845.js",
    "revision": "63a8eae43ea7549747f2f43920b9a87c"
  },
  {
    "url": "/_nuxt/pages/newspage.09ec4f52da7867cb7a3f.js",
    "revision": "d2d3dd03de915c13a7bada360b310f0f"
  },
  {
    "url": "/_nuxt/pages/orgs.26261ebd77501ecb134d.js",
    "revision": "5c2e1967cdf61d9c27e3dc31965971c1"
  },
  {
    "url": "/_nuxt/pages/policies.054d62116cab681f3678.js",
    "revision": "2002c9df9225ebc5c9bca345d44f055a"
  },
  {
    "url": "/_nuxt/pages/signedup.cdeb9a8d5f1f0a5645ac.js",
    "revision": "5b494f1d89090eb66c6395a525a7d3e8"
  },
  {
    "url": "/_nuxt/pages/subscribe.db89b1d505e0b42f2255.js",
    "revision": "4db478eb6aa8fb21b7fe4fa20723f929"
  },
  {
    "url": "/_nuxt/pages/Test.75f0b0962e9e1a338d81.js",
    "revision": "6bf221e3d2a1e4e4398ee04d1bb36a8a"
  },
  {
    "url": "/_nuxt/pages/updates.df21ab180d392dd03cbc.js",
    "revision": "7f1bf1c4d7837da78bb7f6b18b52d812"
  },
  {
    "url": "/_nuxt/vendor.0c9961278e6b1f6cf4b8.js",
    "revision": "885fe8287b0950352307e86c9d24d015"
  }
], {
  "cacheId": "phagedirectory",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*'), workbox.strategies.cacheFirst({"cacheableResponse":{"statuses":[0,200]}}), 'GET')





