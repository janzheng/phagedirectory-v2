importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/06c1f4b8179ad1d86a0b.js",
    "revision": "05a719f9eb1f00d717aea4a8e4d75646"
  },
  {
    "url": "/_nuxt/1172480f982eab0103ba.js",
    "revision": "c4709c1f37d7d88e1424af0af7264a23"
  },
  {
    "url": "/_nuxt/23808ff1baa8e9fe5638.js",
    "revision": "3231b9068bc4a86971bd53b271581719"
  },
  {
    "url": "/_nuxt/26814e30f5e622db4006.js",
    "revision": "1475a7c0c7e3c8c0aeec159758504500"
  },
  {
    "url": "/_nuxt/26e784492c28ea3b0971.js",
    "revision": "8b81a6f77d2b9bdc534d738213a078f1"
  },
  {
    "url": "/_nuxt/33311854e1f7f4e0c951.js",
    "revision": "40517d60bbd5db3f3c9004f8f9522bad"
  },
  {
    "url": "/_nuxt/35a237e516b4954781ac.js",
    "revision": "c15931a59b4c62766c30b75644681f43"
  },
  {
    "url": "/_nuxt/39f1bc79749936edf93b.js",
    "revision": "25f2a83eb274547c596e287e68907c7c"
  },
  {
    "url": "/_nuxt/3e87272f466a36867c68.js",
    "revision": "594cce7316df8e195a3d228e14ab26c6"
  },
  {
    "url": "/_nuxt/4382a37d0fd83135ccfb.js",
    "revision": "a9c75f84672792839c207da6ce670b80"
  },
  {
    "url": "/_nuxt/44e3259cfc99ce8a87b2.js",
    "revision": "498a570791fdf259f126a84b15a99ad7"
  },
  {
    "url": "/_nuxt/51b6933182c365829efe.js",
    "revision": "b477d6a23a0d5f8e6b9a822b33bd30cf"
  },
  {
    "url": "/_nuxt/570467e66c9e7a12fd70.js",
    "revision": "393522d201247877d0125b99af0519f6"
  },
  {
    "url": "/_nuxt/5eacb000c678cf5d582e.js",
    "revision": "601961475183f5182d2467ce9cac12f5"
  },
  {
    "url": "/_nuxt/6fed58aa912b4f9d4529.js",
    "revision": "37d522d478db25593d3efeb52e791025"
  },
  {
    "url": "/_nuxt/7284e8204575c5f59795.js",
    "revision": "fad1c5dd9ca936db1386b68f23a56da2"
  },
  {
    "url": "/_nuxt/7b1bbd690c24357d5741.js",
    "revision": "e55a18d76d4899ba2c9fc3febe8993fa"
  },
  {
    "url": "/_nuxt/9cfd8af16103461c2caa.js",
    "revision": "70b6cf147025a9769c785dda5008ca8b"
  },
  {
    "url": "/_nuxt/9f60912d18f448091eb3.js",
    "revision": "a81c8d3f4155784f9de17574c74652a8"
  },
  {
    "url": "/_nuxt/9fe6bc9f148a215d0130.js",
    "revision": "05ec344ea7423617021a618729ea9b8b"
  },
  {
    "url": "/_nuxt/a310f3d01020b17d7055.js",
    "revision": "3056fe5ccb5b7a181ebc2ddb4abbaceb"
  },
  {
    "url": "/_nuxt/a54b54757e9938543981.js",
    "revision": "87c361a6685de892784679bf205d813b"
  },
  {
    "url": "/_nuxt/b5963bccf07f1ca89c1e.js",
    "revision": "bef3689049554fc02e013962453bbbf7"
  },
  {
    "url": "/_nuxt/be660f4706a961c1b347.js",
    "revision": "1b270b465d07180c9f011b1f3b3f46fa"
  },
  {
    "url": "/_nuxt/cac368c65f25cd42c345.js",
    "revision": "34a8983034137d5969e120879f657978"
  },
  {
    "url": "/_nuxt/dccd446f69731872165b.js",
    "revision": "64c1b95d307bc57dc1fdd93b53d3ac2a"
  },
  {
    "url": "/_nuxt/e3412ac9d36cf1eaa947.js",
    "revision": "4ad9202df034458d0f5e3ca7d7f55593"
  },
  {
    "url": "/_nuxt/eb8a7b839d2f6a9006f2.js",
    "revision": "f9e0de0aec14bde877a3dca7662e29a4"
  },
  {
    "url": "/_nuxt/ee5dfca2ad591d03a194.js",
    "revision": "a13963d3b65c0be976a7a67816bed85c"
  },
  {
    "url": "/_nuxt/f0f003418507492088e2.js",
    "revision": "593b1159cb6d50a554ce23f295056850"
  },
  {
    "url": "/_nuxt/f2ea36c9e6e8c03c82f4.js",
    "revision": "e107bdd7ac5c53870bd494645f8f6cb8"
  },
  {
    "url": "/_nuxt/fec7ceea5e787512c9a9.js",
    "revision": "a51373a9d09c429c6b5b6bb60dd10197"
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
