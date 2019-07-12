importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/029460e5743b63450f46.js",
    "revision": "2402f917c7ea53d414bcc6fd5932c7bb"
  },
  {
    "url": "/_nuxt/0771e1dcd6105961d79e.js",
    "revision": "d010b4851538a02659aa9710fbb83bdc"
  },
  {
    "url": "/_nuxt/0b02ba748ae5f0489ab1.js",
    "revision": "9d45f941cb5bf5a482fd95abb4b4d717"
  },
  {
    "url": "/_nuxt/0daa412d784eb9a7a03a.js",
    "revision": "0500bb4da1d968abd3402e9e2a76d4bc"
  },
  {
    "url": "/_nuxt/1e62cfddde680e0d4216.js",
    "revision": "6f91ff9d553e2c6699acfc1c7f241b8f"
  },
  {
    "url": "/_nuxt/1ecb69ccac0fdb21b851.js",
    "revision": "ef3632757cb20453a140b938045c9ad3"
  },
  {
    "url": "/_nuxt/388effe53ebafcdd69cb.js",
    "revision": "7161fe288ac9c4fac0df5e05af4cc3da"
  },
  {
    "url": "/_nuxt/3b86ea83637ba9d6cf1e.js",
    "revision": "8044cf769c5c58ea7a87a0c9de182c2c"
  },
  {
    "url": "/_nuxt/3ce4d024cb0d6b0fb4eb.js",
    "revision": "2e171eb922ba0d3fdfed6734d6055af1"
  },
  {
    "url": "/_nuxt/4f2e42a47c6cd43d5b43.js",
    "revision": "adb9ec2ab8e5d2601d93c53586e7b53a"
  },
  {
    "url": "/_nuxt/585c676c8d47842ba13a.js",
    "revision": "491c6a38ba9c6aab17554bf6c426d59b"
  },
  {
    "url": "/_nuxt/6618bd08f1e559ccf02e.js",
    "revision": "a574a07b14308770c6a4e5a5277b46d0"
  },
  {
    "url": "/_nuxt/6e2351f05897c22b47f1.js",
    "revision": "c01e352263ccc17c116375f8ee0f9c97"
  },
  {
    "url": "/_nuxt/6fb425195f96589e35a7.js",
    "revision": "821ff1771a9ddeb5c4135fdd719ecd75"
  },
  {
    "url": "/_nuxt/88305fb0551f5f5f348d.js",
    "revision": "c70a3042f8b7f2dd0f88c92b7493ba0f"
  },
  {
    "url": "/_nuxt/8d42cd7512d8bc6ff6c4.js",
    "revision": "8ba11e035d4001cbb3b9cd44ac1902be"
  },
  {
    "url": "/_nuxt/9c73ddd3ad5049351680.js",
    "revision": "1a09dfc6ec28ee34f4d84c2036f492b5"
  },
  {
    "url": "/_nuxt/9ea3148d3cb21e1fbb6d.js",
    "revision": "f6bdd703d68a781e804c14f4d410cbf5"
  },
  {
    "url": "/_nuxt/a407717d16de9ded0f38.js",
    "revision": "7ab3daba341a409504b8d3efba9e8d50"
  },
  {
    "url": "/_nuxt/b55bb48de787e9d3e82a.js",
    "revision": "a153f096a2e823cf7c3bfd9fbf466e07"
  },
  {
    "url": "/_nuxt/bd5164dc5b9adcb2e70c.js",
    "revision": "b1d4c7cbf71e9ec67864c6a9496d4136"
  },
  {
    "url": "/_nuxt/bea6b8b798ad0007259a.js",
    "revision": "c678de36df65c36cb397118857146d5d"
  },
  {
    "url": "/_nuxt/c2c52d083ea1e17165c8.js",
    "revision": "d7aba5597679d0c62240fa8754ec8b2e"
  },
  {
    "url": "/_nuxt/c3cb999a643b5366b810.js",
    "revision": "11bb466e7f66ad2e31d04ef495da602d"
  },
  {
    "url": "/_nuxt/c83fc2e5f247712d6c7b.js",
    "revision": "18be07b719d9c1d47826b9912a370159"
  },
  {
    "url": "/_nuxt/cacb49b94ebf3fa85a80.css",
    "revision": "a3d0a41dc4dbcbd053b43fb04e09ac80"
  },
  {
    "url": "/_nuxt/d8c60fc2eed1dd2a992e.js",
    "revision": "fc08bf91b23f5bb0d13d4d0047570737"
  },
  {
    "url": "/_nuxt/e92ee9404293a6585789.js",
    "revision": "08c8b19e0a356431e2c443c4f7300195"
  },
  {
    "url": "/_nuxt/f556330c621dca7b8064.js",
    "revision": "e347ad129fc11d71067641040d73662f"
  },
  {
    "url": "/_nuxt/img/2d8ffac.png",
    "revision": "2d8ffacc8bf31ab23c86a0e25f6b8b44"
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
