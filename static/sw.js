importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/01e48dff41092a308882.js",
    "revision": "49e6f1446004433313958591348ccb7e"
  },
  {
    "url": "/_nuxt/01ef067379ebf0970bde.js",
    "revision": "2df50f7c8359b8ec9bfb783ce28b8851"
  },
  {
    "url": "/_nuxt/0b43c52b3f1ec5f7a018.js",
    "revision": "aba13eb5ef25e4123cc4b1ac343056bb"
  },
  {
    "url": "/_nuxt/0d97eea25c76a16695b5.js",
    "revision": "4ea0b1e3bb077666dd82069d33562ffe"
  },
  {
    "url": "/_nuxt/14b9094e5e9c6ee4f377.js",
    "revision": "d12b9a1edbdfe9d43c188dcaa287a61b"
  },
  {
    "url": "/_nuxt/15882a428303b7dba289.js",
    "revision": "442c147875994c9bc193438b33aa1e5e"
  },
  {
    "url": "/_nuxt/1824c00945243e3897c3.js",
    "revision": "91bc2928d8ba9b746ad1f02d7b5e6960"
  },
  {
    "url": "/_nuxt/198dfa367c69360f2f5a.js",
    "revision": "31c259bdab17b8d9424142d9e5c62a71"
  },
  {
    "url": "/_nuxt/2102f7a1ee15330f943f.js",
    "revision": "f5ce254747234f75e92aede69c9db7fb"
  },
  {
    "url": "/_nuxt/2c0004906e4055734da0.js",
    "revision": "16ec5fd6632285bcb6b0a78382be57e2"
  },
  {
    "url": "/_nuxt/3739d42b7e900af747f5.js",
    "revision": "32c7cebe2d48a948c35635a1684e1094"
  },
  {
    "url": "/_nuxt/4e8974158298faecf587.js",
    "revision": "e7cfee538957963a4c11957f173bea8d"
  },
  {
    "url": "/_nuxt/6489f45d4b6e9cd32e6f.js",
    "revision": "334e33b99f3074de5b1091d704ab892d"
  },
  {
    "url": "/_nuxt/6c46c8d651f4e5779295.js",
    "revision": "9cd10b7db79d5ae51f31c7fd78a6f6be"
  },
  {
    "url": "/_nuxt/702064bc4dd7a13d53a7.js",
    "revision": "ff4c42cdf5319418c963c10425e3346b"
  },
  {
    "url": "/_nuxt/780b1b1256b87e8b1909.js",
    "revision": "7a8bb284fa11c0a7fae9dc7107ceb8f7"
  },
  {
    "url": "/_nuxt/8727e3405510364ed4ca.js",
    "revision": "4fd791d71ac9c9e0b4004053ef4904c2"
  },
  {
    "url": "/_nuxt/8f85282ce7ba34854c3e.js",
    "revision": "a1bacf4658c1a667582069a263ee6512"
  },
  {
    "url": "/_nuxt/a3aeefc672958d543dcd.js",
    "revision": "c5a4ab9e89cb420ed118c290444d6763"
  },
  {
    "url": "/_nuxt/a975fe5454b9483e9f9c.js",
    "revision": "f0e6f584b743ad54ab7c26964b7a400e"
  },
  {
    "url": "/_nuxt/addf142f3e14f015bcc0.css",
    "revision": "37ca41bbde3ed87f3b652ece243c9270"
  },
  {
    "url": "/_nuxt/b614a12ca53367d22d39.js",
    "revision": "00ab751a73a4102dd5aaed16fc6e9e00"
  },
  {
    "url": "/_nuxt/c428e46c2f96c6d0a2f4.js",
    "revision": "125222df1098cd8d42b34a500ed6f1f5"
  },
  {
    "url": "/_nuxt/c6f167416c615db22f32.js",
    "revision": "bdd0131470614ab6b4fe199ddce5a449"
  },
  {
    "url": "/_nuxt/d007c58ec844374a259d.js",
    "revision": "1894c5ecaf922f82d13846984787654b"
  },
  {
    "url": "/_nuxt/d6f8092b3dcdb4419b90.js",
    "revision": "a2665e1a2ce4efa03d779d7ef19e3003"
  },
  {
    "url": "/_nuxt/d96e1e41030b323ff1a5.js",
    "revision": "fbeb52ccc2b4e357975dc3702d4c1fe8"
  },
  {
    "url": "/_nuxt/e64accf6fe3583431f30.js",
    "revision": "e8bbc62e0b85a3d0cc712dee18f6809e"
  },
  {
    "url": "/_nuxt/ef2a7e674f8453b2a930.js",
    "revision": "d9c1b197711834743e7b9df190aa058b"
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
