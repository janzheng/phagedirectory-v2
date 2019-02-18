importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/035cb0fba47ed2036b24.js",
    "revision": "ef7e0d7484b856d4b358e251d01c1bd9"
  },
  {
    "url": "/_nuxt/0e4de49a45f066edaf5c.js",
    "revision": "914bf2ef5ed0a9fdb5788997f1d3f1fd"
  },
  {
    "url": "/_nuxt/1c0b19cf5b5f0d1b8400.js",
    "revision": "16405c088767d85d37fde5847b82caeb"
  },
  {
    "url": "/_nuxt/279c126a336d378f780b.js",
    "revision": "9df3d249c931529fee7533486a72c181"
  },
  {
    "url": "/_nuxt/432f9e6093f2d4ac49c2.js",
    "revision": "b49d3e06ce31d89af950ee348eecff48"
  },
  {
    "url": "/_nuxt/5677c3bc63d46ddc6ca0.js",
    "revision": "a6130d64745253c749d0fee7abce6f99"
  },
  {
    "url": "/_nuxt/5722ad25f95204dfee96.js",
    "revision": "f5159fa822738706ff89519969226791"
  },
  {
    "url": "/_nuxt/5cc578ee0febd102019e.js",
    "revision": "b7b86601f9420f8ef73f5a42bbd72fd1"
  },
  {
    "url": "/_nuxt/64c316bb58848a02dce7.js",
    "revision": "7ddb7fcffa26f430586e07681ad57794"
  },
  {
    "url": "/_nuxt/6e24b7e858b790ac3db1.js",
    "revision": "ed31d0f6d0f467661bfbda9e44336d27"
  },
  {
    "url": "/_nuxt/72f07a735da3bb5eea56.js",
    "revision": "3517ae8552597abd0074031b455c61a1"
  },
  {
    "url": "/_nuxt/77c8030a255256ba8ed2.css",
    "revision": "e1344e3bdc8ed5ad01c8327d9cbf7bb2"
  },
  {
    "url": "/_nuxt/81d89e62c388d40472f5.js",
    "revision": "517a4724ef24a2bc447fd9e2625fd2fe"
  },
  {
    "url": "/_nuxt/8c8d680f982981838b7b.js",
    "revision": "c5b9c237dd89c4bf074f04ad5d8dd3bb"
  },
  {
    "url": "/_nuxt/9c2f13adf2636d7edd31.js",
    "revision": "bfe42bf9ce5fd7f798c500d3a659c54d"
  },
  {
    "url": "/_nuxt/aaf7cd43addbf46e3302.js",
    "revision": "5541524a8bd7ad1d78a4032b6aebe4f8"
  },
  {
    "url": "/_nuxt/b405df114cec788b7880.js",
    "revision": "32d4327a4a5e2109b57164864bcc3b1d"
  },
  {
    "url": "/_nuxt/b7078be7a8003b8433a4.js",
    "revision": "fc8735438ee19fa94987b95a32cd4b3d"
  },
  {
    "url": "/_nuxt/b7f9dce467449459fe43.js",
    "revision": "a5d1d81acc714f4d058b32ea0496d2bc"
  },
  {
    "url": "/_nuxt/bc17006a35372c8aaf20.js",
    "revision": "e51c19e81030a681726dfeec9838ba3a"
  },
  {
    "url": "/_nuxt/c28fe92913ca64fd83ae.js",
    "revision": "acfab71cb52a0da9b6a20c9759589aa4"
  },
  {
    "url": "/_nuxt/c8fd1d3a5f60634b1930.js",
    "revision": "98be8732912bf9fb182e459382525842"
  },
  {
    "url": "/_nuxt/cc168a6514c602e201d3.js",
    "revision": "ddf3e0f3e366997f1927736e0d53e625"
  },
  {
    "url": "/_nuxt/d34f23cb2537af90df74.js",
    "revision": "65441bf03aeafcbfca8b5118565de6fc"
  },
  {
    "url": "/_nuxt/d3c0dc8b23eccf87f7ad.js",
    "revision": "b1f143cf46ada737967b845686a5625a"
  },
  {
    "url": "/_nuxt/f11e6ee7564bc5d98257.js",
    "revision": "6c4b2be40d36ad6e7f7d9f6e4f3c20c1"
  },
  {
    "url": "/_nuxt/f546a7368a8281f4ba2b.js",
    "revision": "ba82a1e1f83be1e472e1c0732233e443"
  },
  {
    "url": "/_nuxt/f6482eb56d217c4fa2f2.js",
    "revision": "aac9d7e7f17d73393e2628b2d2b2a970"
  },
  {
    "url": "/_nuxt/img/e7a1c10.png",
    "revision": "e7a1c105ef42620132ee1347dd7f5493"
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

// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})
