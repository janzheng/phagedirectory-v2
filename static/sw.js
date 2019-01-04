importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/00499fa5fb2d27415dbd.js",
    "revision": "d56020f80e2b7b089d1aebe2bbdd9f7f"
  },
  {
    "url": "/_nuxt/1c60159428359d06a841.js",
    "revision": "ae19be02ade20786c92bb380fb1b7c22"
  },
  {
    "url": "/_nuxt/2ca49ce54451ac97a809.js",
    "revision": "29c0b8121aaf861524974ab210406b59"
  },
  {
    "url": "/_nuxt/38c67d5d6de25d6ee5a6.js",
    "revision": "16586867540468ea6f481576e5d23b55"
  },
  {
    "url": "/_nuxt/440eb7140c3572ef462e.js",
    "revision": "6d3f2950c45b9d260aa238800236e2d9"
  },
  {
    "url": "/_nuxt/4734bbdaab4866f46949.js",
    "revision": "961c90a21c11f35ba5ec6278fa6fabc1"
  },
  {
    "url": "/_nuxt/5085c0ff0208c8543bf2.js",
    "revision": "080211394750d147168c21906c8f9db5"
  },
  {
    "url": "/_nuxt/51cdcc216d5fe6da27a0.js",
    "revision": "15dab73e7222a6d5fe1ade6ee5105a94"
  },
  {
    "url": "/_nuxt/57bc59866a219e0e5f33.js",
    "revision": "cb4da8b25fcdaf8db7bcdfed51f966da"
  },
  {
    "url": "/_nuxt/5fed06178ba1fa910174.js",
    "revision": "b050dfb686d0f96c2f78bbdfa4ef35e0"
  },
  {
    "url": "/_nuxt/682da5bd5f50e5b350a1.js",
    "revision": "85fbe9857ff44b7965943840f5882d1b"
  },
  {
    "url": "/_nuxt/73f4f2a3b13f54907778.js",
    "revision": "ae337ca9b976d2c6afcde95b5738c9f9"
  },
  {
    "url": "/_nuxt/813034fbf53b0afd730d.js",
    "revision": "4bade9fe44ec121cc5655a3257e2e9f1"
  },
  {
    "url": "/_nuxt/8b97c9451a0b204dc3c5.js",
    "revision": "97a5e9e5c015cb1daca02d1937f5a0a3"
  },
  {
    "url": "/_nuxt/8d5b58b11cdffb663e6d.js",
    "revision": "f1832d24a3b426a1afd82fe9b0cee4b7"
  },
  {
    "url": "/_nuxt/935e5329606af45e98ef.js",
    "revision": "8b5c8c1cffb7d59e0b4e1da932e28434"
  },
  {
    "url": "/_nuxt/9e1d12b787d471b0edec.js",
    "revision": "107c8ac623d19cc0c0654cd05fb0f3a4"
  },
  {
    "url": "/_nuxt/a1b04a9eeb3804f8030d.js",
    "revision": "bed13595fd2757717fe408d1cf2af05b"
  },
  {
    "url": "/_nuxt/a1f2f675a62bee741714.js",
    "revision": "dbe256272e6d979c9a2f119c76495b68"
  },
  {
    "url": "/_nuxt/ad30c776fa29cf3dbe15.js",
    "revision": "8ab3e2f7cb3ef778e9b1ef423f9db920"
  },
  {
    "url": "/_nuxt/b3659b6fec29c9df67bf.js",
    "revision": "1b1c33ce5a25bc0ae916628af186a586"
  },
  {
    "url": "/_nuxt/ba66dceb7c7243854f00.js",
    "revision": "87e50be0aa799807343af2cde01ce854"
  },
  {
    "url": "/_nuxt/bfa93de62e715029753c.js",
    "revision": "756147811d594aea318a4c3c6b7bb157"
  },
  {
    "url": "/_nuxt/c0a18736e951da790b34.js",
    "revision": "ae63cde2d94c7461686b4c8096ac6a92"
  },
  {
    "url": "/_nuxt/c710849c2a5a0f9dc233.js",
    "revision": "51cbd89bb5b40210de20662ecf8bab73"
  },
  {
    "url": "/_nuxt/c7441aab874091e3ac64.js",
    "revision": "a1cfe9bfda0b7530fe7aa1c9f8d32aec"
  },
  {
    "url": "/_nuxt/ce9c5dd5850a2cad16ae.js",
    "revision": "cf49ded4a1cc814b8792bad0584c60df"
  },
  {
    "url": "/_nuxt/d1e3da85aa06fa6b3fcb.js",
    "revision": "a2cc80d9797fc603959fbf20e81a0c1b"
  },
  {
    "url": "/_nuxt/d79b4e4dbfbeaae21721.js",
    "revision": "1b8f95e03d1fe0b77bbe06202615156d"
  },
  {
    "url": "/_nuxt/e0305a08eed47f711912.js",
    "revision": "72bfe0aae46c71156f9e01c50a8277ab"
  },
  {
    "url": "/_nuxt/f8f023c9767d52570578.js",
    "revision": "0db8d0c4df66c1c6378b3cee00178e7b"
  },
  {
    "url": "/_nuxt/img/7a8fd03.png",
    "revision": "7a8fd0369d0d551859e78e2763237408"
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
