importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0b57b917a35fd2175754.js",
    "revision": "219182bdd85b279a0b511addc4a64477"
  },
  {
    "url": "/_nuxt/1b58ff65d414ad281fa9.js",
    "revision": "70bd6f9ac79e45bb70ebd4297cd28377"
  },
  {
    "url": "/_nuxt/2533bd83557b7424500a.js",
    "revision": "974620c87d6cb657925cd7e85490e165"
  },
  {
    "url": "/_nuxt/32fe45776ce8beacadf0.js",
    "revision": "98a110d822014badc169ba5f40be07a8"
  },
  {
    "url": "/_nuxt/3452975e6e119a427923.js",
    "revision": "a29c5b493ac7861c3a3a7505e40b44df"
  },
  {
    "url": "/_nuxt/3e7f418dce3e9c5afe8e.js",
    "revision": "21007321b2647017877a8f3f2f4415b9"
  },
  {
    "url": "/_nuxt/470b2be17bccd3c19c63.js",
    "revision": "f2f21ff48fc1f37b972d19f87aae5130"
  },
  {
    "url": "/_nuxt/4e7669915ad616c24c23.js",
    "revision": "1edb869f747b9d65408abe56c2e5c0a5"
  },
  {
    "url": "/_nuxt/50f686279d1bd72eca91.js",
    "revision": "9edf854eddec98521940c3b3d9022975"
  },
  {
    "url": "/_nuxt/5b67f5c86ae5c7130175.js",
    "revision": "12d600c4ac1bad2652503501c6e056f0"
  },
  {
    "url": "/_nuxt/5f64c8760698c0b6599b.js",
    "revision": "e491b50e8bf32866f797c453c1968a14"
  },
  {
    "url": "/_nuxt/66f6e5997eff668ca184.js",
    "revision": "98cb40bb6fb4846df04512dbc4c2befe"
  },
  {
    "url": "/_nuxt/6e9fab7ae91c66a07f59.js",
    "revision": "a9a4923aa081b81ec139c1d99c31a275"
  },
  {
    "url": "/_nuxt/6f741e0a45ab42fe2900.js",
    "revision": "951e884a3c6002a7f6ce131cc3494902"
  },
  {
    "url": "/_nuxt/7284e8204575c5f59795.js",
    "revision": "fad1c5dd9ca936db1386b68f23a56da2"
  },
  {
    "url": "/_nuxt/86ba2d257cc9466c509b.js",
    "revision": "f962f44119d1f07af024060da1e8a026"
  },
  {
    "url": "/_nuxt/881de433350fc131db80.js",
    "revision": "83b64d890542e00f046a2f0637932f7f"
  },
  {
    "url": "/_nuxt/8bfa1b23d82a20b3f3d8.js",
    "revision": "cd6e0ac84f2d583774594993ef93d918"
  },
  {
    "url": "/_nuxt/9ad622b594a8c30ceb90.js",
    "revision": "fc5ceaf51955b2392486f6f17522a238"
  },
  {
    "url": "/_nuxt/9e1086a503592984fc16.js",
    "revision": "d9becbdf33ea7c7aa30913ed3b4ba675"
  },
  {
    "url": "/_nuxt/a0f2696adb50b694d539.js",
    "revision": "514a23bc199cdd044d1d8f6c538ffd88"
  },
  {
    "url": "/_nuxt/b0fb096356f38914b325.js",
    "revision": "3ae9696d655c4813432ae8153d97cefb"
  },
  {
    "url": "/_nuxt/b428feb8b7d028a5a542.js",
    "revision": "6c87751f6936823f15a723173901d961"
  },
  {
    "url": "/_nuxt/b5963bccf07f1ca89c1e.js",
    "revision": "bef3689049554fc02e013962453bbbf7"
  },
  {
    "url": "/_nuxt/c09701384f506f5574da.js",
    "revision": "98b623654442eee0f6f90e8290a51133"
  },
  {
    "url": "/_nuxt/c662ca5d535bc0353a6f.js",
    "revision": "9bb17ea8f5e9313599f2e725ed88b00b"
  },
  {
    "url": "/_nuxt/cc08a1ee479feeef0826.js",
    "revision": "6f434da83803573652cc896e65151100"
  },
  {
    "url": "/_nuxt/d13292a7087fe18d3398.js",
    "revision": "4bb5a0f5422d943ea38931032a77364c"
  },
  {
    "url": "/_nuxt/d76657532cab28ca2d4a.js",
    "revision": "454ae8a24359c3ee4a5e3e450c0b6859"
  },
  {
    "url": "/_nuxt/f2ea36c9e6e8c03c82f4.js",
    "revision": "e107bdd7ac5c53870bd494645f8f6cb8"
  },
  {
    "url": "/_nuxt/f358ffcbcfe0b0f9ec59.js",
    "revision": "3d5ea14c0bddfd35fed852b47422f1bd"
  },
  {
    "url": "/_nuxt/f96bb2f528fce55dc0fd.js",
    "revision": "b99bb732c19226fbb08fd859bc207f83"
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
