importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/02743829ad685261a263.js",
    "revision": "162b47550f894e5d17998bc59a2f3ff3"
  },
  {
    "url": "/_nuxt/03dc2f062c72017af2ee.js",
    "revision": "c60a46d0c9db19a509ed85aa681f3750"
  },
  {
    "url": "/_nuxt/0b44ae868890d3f41af5.js",
    "revision": "5ec1f4e7dd2a10c146a77596cc232fce"
  },
  {
    "url": "/_nuxt/0f190ba10d2ee7e12e01.js",
    "revision": "102bbf491ae534c64bc85b4e4e4b49d4"
  },
  {
    "url": "/_nuxt/1dda9f4e0a8a8a553749.js",
    "revision": "a4ed9a0fe314329984d752a15d855cf4"
  },
  {
    "url": "/_nuxt/1dedc531afa582607667.js",
    "revision": "49a7203c5d9235e08cee41c2ed28eccf"
  },
  {
    "url": "/_nuxt/2c06bac16bd814eb3437.js",
    "revision": "9a3b55ecb0739a5c22fa562baecc44ad"
  },
  {
    "url": "/_nuxt/2ef1b4f44fafdd65435b.js",
    "revision": "81967df9073af40d3902501c7bb618b4"
  },
  {
    "url": "/_nuxt/36d06421cca65725a16b.js",
    "revision": "5fd21cb88130ca1628a7a57fb09b7446"
  },
  {
    "url": "/_nuxt/3bce6e139cf1ec10e8f8.js",
    "revision": "6bcdce7dae7c359dc2497e010ad095dd"
  },
  {
    "url": "/_nuxt/43893aeb050a2a56ee7b.js",
    "revision": "ab609a05fa937ffec1d8cc3615e06f92"
  },
  {
    "url": "/_nuxt/44c67adbf1a1fb568cf0.js",
    "revision": "6ee31bd04ddb31a880d849efb138bf8e"
  },
  {
    "url": "/_nuxt/4aec672bc35837028df9.js",
    "revision": "cac867e5475a2236ac8cc017c5a55a08"
  },
  {
    "url": "/_nuxt/60a9d36cff63931e2785.js",
    "revision": "ed9ebb1f7ee6cd6644dce8ceecf8c8e2"
  },
  {
    "url": "/_nuxt/66c8cc4d5fd5e581802c.js",
    "revision": "82da48dc5e728be984e2f9661e07b90a"
  },
  {
    "url": "/_nuxt/7493675529816e3cf558.js",
    "revision": "232a47a7b30cff38e030256d11d638a0"
  },
  {
    "url": "/_nuxt/918a3e7f7341660d88f6.js",
    "revision": "c88662a6bcb4106675b6f791acb1c4ec"
  },
  {
    "url": "/_nuxt/976ce625c5ac17c6cf06.js",
    "revision": "c6e7466bc0e65a8d5d6064c69afff29b"
  },
  {
    "url": "/_nuxt/99dfb22306d4eedf7e04.js",
    "revision": "41b55687601ab615b333922cf6e245af"
  },
  {
    "url": "/_nuxt/9b4c74780fb054225ca2.js",
    "revision": "1c18e2070850837dc9c3302a0e3884ce"
  },
  {
    "url": "/_nuxt/9f2fcbe30053b1c32299.js",
    "revision": "745f854f1d58b5f6534acb1eb7c7bbfc"
  },
  {
    "url": "/_nuxt/a3b093f4058245435965.js",
    "revision": "b177e0abaa23cb420434871276e210ed"
  },
  {
    "url": "/_nuxt/a4ef4e271fc1d92ac481.js",
    "revision": "fea2596486a812fc875b956a8c7ce2d8"
  },
  {
    "url": "/_nuxt/a4fb782b31cd362bcaaf.js",
    "revision": "ed90f644ea89e3db7cde58be2ecbcdf9"
  },
  {
    "url": "/_nuxt/b72d7f809b53dbdf49a3.js",
    "revision": "f1e7b4649e5679afb95f64e1e76f7d6b"
  },
  {
    "url": "/_nuxt/b7d4a19488e226b65ff6.js",
    "revision": "de2256f18011c67ad253cd46a7fb8425"
  },
  {
    "url": "/_nuxt/c0de4239763f00ad9dc6.js",
    "revision": "7c8ed59491344d6d988c2ef67fe3e589"
  },
  {
    "url": "/_nuxt/d5dc491cd51c5e902687.js",
    "revision": "90bea981a2e21bc70dd74d7d98e659dd"
  },
  {
    "url": "/_nuxt/d78be8c428931424a48b.js",
    "revision": "b514a21930e161d55f524e891ab4a9a2"
  },
  {
    "url": "/_nuxt/da284466f71cfde1998a.js",
    "revision": "16110cfd829bd7d030cf0cc6585cc687"
  },
  {
    "url": "/_nuxt/dabc3e2b6c65f25d8965.js",
    "revision": "5a05367048ba07f707271ee08fcf89a0"
  },
  {
    "url": "/_nuxt/ebf668005203316dbcd8.js",
    "revision": "e1a9aa89666931eea06d4d82e0fa7e85"
  },
  {
    "url": "/_nuxt/fcfa3d708f65bd9240be.js",
    "revision": "1c9c1efa2c2e732147d462ba2dbb7866"
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
