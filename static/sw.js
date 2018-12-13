importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08dac986ef3cb4e3d82b.js",
    "revision": "54a82c27a46fa04b56061d2ef59daf99"
  },
  {
    "url": "/_nuxt/0be53cef79d53fc8eb2b.js",
    "revision": "72f9c5d4b77ee50b925e43877471185f"
  },
  {
    "url": "/_nuxt/101b3b690b7c26a1a9d6.js",
    "revision": "d2b091ddb6a03b856536a30614e0fd7f"
  },
  {
    "url": "/_nuxt/10b9228e2fad5e214c84.js",
    "revision": "7e02acbb2d08f64b68c06da1cd52c6c3"
  },
  {
    "url": "/_nuxt/1b6579e2e24cded1658c.js",
    "revision": "f3bbcda93239b6ea5cb1330ecacf2f59"
  },
  {
    "url": "/_nuxt/24c8bcf3a2b0c7847309.js",
    "revision": "b9060b3e0d220a8d3e62f53b53bbb488"
  },
  {
    "url": "/_nuxt/26832846cb4d38b76f5b.js",
    "revision": "86dc83853ede666ad08251a2da609c6e"
  },
  {
    "url": "/_nuxt/2d12baf8f438488ac715.js",
    "revision": "9299d8e6695bbe6e63687c04f2b9b8e7"
  },
  {
    "url": "/_nuxt/31534413563ad83bde41.js",
    "revision": "9f42a665bf8604a79e3434c929374714"
  },
  {
    "url": "/_nuxt/3476cb4775f3867cc973.js",
    "revision": "81ee082c34397b361270f1e911ebca03"
  },
  {
    "url": "/_nuxt/376cce6b8cf43c6c4f92.js",
    "revision": "3caca8800e487818f779b05c67dc82a2"
  },
  {
    "url": "/_nuxt/54a6947fc768ffe493ab.js",
    "revision": "533992a273161be1629520415b56c11d"
  },
  {
    "url": "/_nuxt/567fc69e9101b55db6d4.js",
    "revision": "fb4e24bc005ed68a9ecb547566aff673"
  },
  {
    "url": "/_nuxt/5a0f8b2d04919864c7ab.js",
    "revision": "007010a3d72b949df8ec2700c2185914"
  },
  {
    "url": "/_nuxt/5fc2369c8e850293e70e.js",
    "revision": "d533effd91f99e040033e8b2b9659e7e"
  },
  {
    "url": "/_nuxt/6967375e620167a42662.js",
    "revision": "c03e7cf869fffa45b6bb9b8617be0f72"
  },
  {
    "url": "/_nuxt/6d065b5a2f8f73008bfc.js",
    "revision": "7f731e3514598908be780a79cc5e7811"
  },
  {
    "url": "/_nuxt/705121e16752cec80fa5.js",
    "revision": "df0c1fd656c23ea754b799eded5433e5"
  },
  {
    "url": "/_nuxt/90e16e528ec24d0f3fe8.js",
    "revision": "f745e1ef414954d311cee2f13eac941e"
  },
  {
    "url": "/_nuxt/982128a2ae7b0df4678f.js",
    "revision": "6ab102be39f016b04b06a6346c6e18ac"
  },
  {
    "url": "/_nuxt/a432fc324ead91a6cc4b.js",
    "revision": "7febab02817801a5f56b3786b518b876"
  },
  {
    "url": "/_nuxt/a5f8589a2000e58c7b86.js",
    "revision": "419d0936feacd9ddb847f77ccfefd3b1"
  },
  {
    "url": "/_nuxt/aa4b410f17466a41f73a.js",
    "revision": "077aec40d1d7a62be1c7cd071849e947"
  },
  {
    "url": "/_nuxt/b3b0264dfc0c482575f0.js",
    "revision": "5c06a05252a982bae6270a1114f581c3"
  },
  {
    "url": "/_nuxt/be2e168abaae4251d690.js",
    "revision": "fac65f44fc5d893b775da88e6d9070bd"
  },
  {
    "url": "/_nuxt/cc9e4030cfb5b8d31fe1.js",
    "revision": "0e162b1eeedba1b6d3c9d005d6bbe88f"
  },
  {
    "url": "/_nuxt/cef31a58066551fa4ea6.js",
    "revision": "58da6a7a86f156c7d03c5c3a8002902e"
  },
  {
    "url": "/_nuxt/d925a31a6a4f9fe0532c.js",
    "revision": "204dac585ab8275d9b89c2905ce25c4b"
  },
  {
    "url": "/_nuxt/e7c59e67cbf944c7b91a.js",
    "revision": "54b8dcb8957d6783aaabbf251879cc00"
  },
  {
    "url": "/_nuxt/ea85658c92a0f9e02324.js",
    "revision": "07f3fdb26ae149fd7b38d528ba0d8b56"
  },
  {
    "url": "/_nuxt/eaf6f61133fa383612e6.js",
    "revision": "b5e16f3193093d102c476698d93a1dee"
  },
  {
    "url": "/_nuxt/fdde1dc252a078453f15.js",
    "revision": "ea8845618b1fc8bbd95d61870d905fd7"
  },
  {
    "url": "/_nuxt/img/2b993ed.png",
    "revision": "2b993edbbcd2d57c7507a149dd93d396"
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
