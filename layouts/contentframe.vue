<template>
  <div id="top" class="ContentFrame Layout" >
    <Header/>
    
    <div class="" >
      <nuxt/>
    </div>

    <div class="Signup-container _margin-center ">
      <!-- <div class=" _grid-3 _width-content-max _margin-center"> -->
      <div class="_section-page _margin-center _padding-top-2 _padding-bottom-2">
        <div class="_grid-2">
          <div class="SignupCapsid-container">
            <SignupCapsid class="_height-100"/>
          </div>
          <div class="SignupAlert-container">
            <SignupAlert class="_height-100" />
          </div>
          <!-- <div class="SignupRequest-container">
            <SignupRequest class="_height-100" :description="true" />
          </div> -->
        </div>
      </div>
    </div>

    <no-ssr>
      {{ initDrift }}
    </no-ssr>

    <!-- <no-ssr placeholder="Loading..."> -->
    <no-ssr>
      <PolicyBanner/>
    </no-ssr>
    <Footer/>
  </div>
</template>


<script>

import _ from 'lodash'

import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import PolicyBanner from '~/components/PolicyBanner.vue'
import Directory from '~/components/Directory.vue'

import SignupAlert from '~/components/SignupAlert.vue'
// import SignupRequest from '~/components/SignupRequest.vue'
import SignupCapsid from '~/components/SignupCapsid.vue'


export default {

  components: {
    Header,
    Footer,
    PolicyBanner,
    SignupAlert,
    // SignupRequest,
    SignupCapsid,
    Directory,
  },

  head () {
    return {
      title: this.$store.state.pageName || 'Phage Directory',
    }
  },

  async asyncdata () {
  },

  data () {
    return {
      scrollY: 0,
      route: '',
      // searchString: 'testStr'
      // children: route ? route.children : undefined,
    }
  },


  computed: {
    ...mapState([
      'searchString'
      ]),

    initDrift() {
      // console.log('[Checking drift...]')
      // drift for drift@phage.directory
      if(this.$store.state.policy && !this.$store.state.drift && !process.server) {
        console.log('[Starting drift...]')
        this.$store.dispatch('updateCreate', {drift: true})
        !function() {
          var t = window.driftt = window.drift = window.driftt || []
          if (!t.init) {
            if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."))
            t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
            t.factory = function(e) {
              return function() {
                var n = Array.prototype.slice.call(arguments)
                return n.unshift(e), t.push(n), t
              }
            }, t.methods.forEach(function(e) {
              t[e] = t.factory(e)
            }), t.load = function(t) {
              var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script")
              o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js"
              var i = document.getElementsByTagName("script")[0]
              i.parentNode.insertBefore(o, i)
            }
          }
          t.SNIPPET_VERSION = '0.3.1'
          t.load('ks35ggadwzyw')
        }()
      }
      return undefined
    }
  },

  watch: {
    // '$route' (to, from) {
    // '$route' (to) {
    '$route' () {
      // react to route changes...
      // console.log('ROUTE OBJECT', to, from)
      const _this = this
      let scrolled = false
      this.$nextTick(function () {
        if(_this.$route.hash && !scrolled) {
          // console.log('-- hash scroll')
        } 
        if(_this.$route.hash) {
          const scroll = _.throttle(function () {
            VueScrollTo.scrollTo(_this.$route.hash, 900, {
             offset: -20
           })
          }, 600)
          scroll()
        }
        scrolled = true
      })
    }
  },

  beforeUpdate () {
    const route = this.$router.options.routes.find((route) => {
      return route.path === this.$route.path
    })

    // console.log('new route', route)
    this.route = route
  },

  mounted () {
    // handle anchor links
    const _this = this
    let scrolled = false
    this.$nextTick(function () {
      if(_this.$route.hash && !scrolled) {
        // console.log('-- hash scroll')
      } 
      if(_this.$route.hash) {
        const scroll = _.throttle(function () {
          VueScrollTo.scrollTo(_this.$route.hash, 900, {
           offset: -20
         })
        }, 600)
        scroll()
      }
      scrolled = true
    })
  
  },

  // link intercept idea from: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  
  created () {
    if(process.browser)
      window.addEventListener('scroll', this.handleScroll)
  },

  destroyed () {
    if(process.browser)
      window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    // handleScroll: _.throttle(function (e) {
    //   // console.log(e)
    //   this.scrollY = window.scrollY
    // }, 200),
    handleScroll() {
      if(process.browser) {
        const _this = this
        _.throttle(function () {
          _this.scrollY = window.scrollY
        }, 200)()
      }
    }

    // navigate(event) {
    //   const href = event.target.getAttribute('href')
    //   if (href && href[0] === '/') {
    //     event.preventDefault()
    //     this.$router.push(href)
    //   }
    // },
    // addListeners() {
    //   this._links = this.$el.getElementsByTagName('a')
    //   for (let i = 0; i < this._links.length; i++) {
    //     this._links[i].addEventListener('click', this.navigate, false)
    //   }
    // },
    // removeListeners() {
    //   if(this._links) {
    //     for (let i = 0; i < this._links.length; i++) {
    //       this._links[i].removeEventListener('click', this.navigate, false)
    //     }
    //     this._links = []
    //   }
    // }
  },
}

</script>


<style lang="scss" scoped>
</style>
