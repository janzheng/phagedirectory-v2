importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08c9d2e73cc551af7079.js",
    "revision": "9be41280285829f99f06f82dfe8be5c5"
  },
  {
    "url": "/_nuxt/0fefaee15be0d6e06f4d.js",
    "revision": "d8570cbb83be740d104da9e321446a23"
  },
  {
    "url": "/_nuxt/196c1d2c4372ced14332.css",
    "revision": "f4911a332b968875056a08c843f14035"
  },
  {
    "url": "/_nuxt/1b37c1fe3883189c8d4e.js",
    "revision": "ac7b71bd56cbc80d731e05625bc1fb2e"
  },
  {
    "url": "/_nuxt/276ef243500e5df0dc14.js",
    "revision": "8386c2d081b2facd3e7bb668d453e418"
  },
  {
    "url": "/_nuxt/2da1232b548d9d189145.js",
    "revision": "98face442d1fbd8282e72127ec8e3cb6"
  },
  {
    "url": "/_nuxt/2dbb944d46eea401dabf.js",
    "revision": "69d3b5f83d224c3a27a792cef9f990b3"
  },
  {
    "url": "/_nuxt/42c1352f7ce5806a5bbc.js",
    "revision": "9f7653624665ef510f6d4e616566f735"
  },
  {
    "url": "/_nuxt/4fdd29a7961588e660a0.js",
    "revision": "80704cdeafafff00a92dfcb3824fe5ae"
  },
  {
    "url": "/_nuxt/6f8fd1988c7ae39201c7.js",
    "revision": "7a33dfc40b6f81a930ec11ff610cfb37"
  },
  {
    "url": "/_nuxt/74189627254f3df6265c.js",
    "revision": "0ab25a58c26a848474864dc3dba4904e"
  },
  {
    "url": "/_nuxt/7e9a6c510ae6a86b1b55.js",
    "revision": "e296a64dd3b00f64e975feee5b9217cf"
  },
  {
    "url": "/_nuxt/8d0bba4f22734f74c9cb.js",
    "revision": "cc686955dfe86149d4a47101cd0242f1"
  },
  {
    "url": "/_nuxt/8e02c4a5a85510af8699.js",
    "revision": "655a932bc39b08b5b98f0eb1cbf3d6a0"
  },
  {
    "url": "/_nuxt/91386fada18b3bd8eae2.js",
    "revision": "22f1d9ef12ab59997076b4cc5ae64fd5"
  },
  {
    "url": "/_nuxt/914ca67e4e6a6af514cd.js",
    "revision": "f4cdd22e990ed0aa5796eefe19eb6d4a"
  },
  {
    "url": "/_nuxt/968c848a6f91a140cba7.js",
    "revision": "f3c0884867fd46d6ac5454468c1cd6dc"
  },
  {
    "url": "/_nuxt/a264e50aa4234c068fbf.js",
    "revision": "6287ebf2ab9d95804c03902ae989c467"
  },
  {
    "url": "/_nuxt/a2dbcc4cdf89f49b1596.js",
    "revision": "c6442043582ef3a171ae15f716f8b300"
  },
  {
    "url": "/_nuxt/a45962adb6030e6d4238.js",
    "revision": "93247823f24f4d088ab8239ddaf95445"
  },
  {
    "url": "/_nuxt/a4b2e65a06a2c74697fb.js",
    "revision": "ea4b44d19311b932ac50de543cf2cd9a"
  },
  {
    "url": "/_nuxt/a52f41ac2747104fec12.js",
    "revision": "76fef0a0ec2512b8e92a0747e3322eec"
  },
  {
    "url": "/_nuxt/ad4a53ee21ebf7c0dba6.js",
    "revision": "a57e47ec12f26768315bc7d9184100aa"
  },
  {
    "url": "/_nuxt/b3c6bd4105011d000963.js",
    "revision": "d9d212148f65e4cf08761758d4c89e58"
  },
  {
    "url": "/_nuxt/b4068c21d53a801cbd87.js",
    "revision": "dfe53a89c41b7202378ec54882d18b16"
  },
  {
    "url": "/_nuxt/bec33f5f61378bf3b922.js",
    "revision": "b9f95d5d5cee3139dd65d581858e39ed"
  },
  {
    "url": "/_nuxt/ebc9c32aec3b9a331d50.js",
    "revision": "e12501e8cf873bb749470d23863e1066"
  },
  {
    "url": "/_nuxt/edc4a56da795e0649f75.js",
    "revision": "6a0569f81fe28986cd3fe9654108ffd9"
  },
  {
    "url": "/_nuxt/f4d2fb4bbf68138aafbc.js",
    "revision": "22b79865dd95419cd242896ff412827a"
  },
  {
    "url": "/_nuxt/fd4a9144dc855f85f752.js",
    "revision": "e78b7779869960e401db07666d3b4e42"
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
