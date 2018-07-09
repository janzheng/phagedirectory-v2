<template>
  <div class="ContentFrame container">
    <Header/>

    <div class="_margin-bottom" v-if="search">
      <Directory :isSearch="true"/>
    </div>


    <div class="_margin-bottom" v-if="!search">
      <slot></slot>
    </div>

    <div class="AlertSignup-container">
      <AlertSignup classes="footer" :description="true" />
    </div>

    {{ initDrift }}

    <Policy/>
    <Footer/>
  </div>
</template>


<script>


import VueScrollTo from 'vue-scrollto'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Policy from '~/components/Policy.vue'
import Directory from '~/components/Directory.vue'

import AlertSignup from '~/components/AlertSignup.vue'

export default {

  props: [],

  components: {
    Header,
    Footer,
    Policy,
    AlertSignup,
    Directory
  },

  // head () {
  //   return {
  //     title: this.title,
  //     meta: [
  //       { hid: 'description', name: 'description', content: 'My custom description' }
  //     ]
  //   }
  // },
  data: function () {
    return {
    }
  },


  mounted: function (params) {
    this.addListeners()

    const _this = this
    this.$nextTick(function () {
      let scrolled = false
      this.$router.afterEach((r) => {
        console.log('router hash scroll') 
        if(_this.$route.hash) {
          const _this=this
          const scroll = _.debounce(function (e) {
            VueScrollTo.scrollTo(_this.$route.hash, 500, {
                offset: -20
              })
          }, 200)
          scroll()
        }
        scrolled = true
      })

      if(_this.$route.hash && !scrolled) {
        console.log('-- basic hash scroll')
        VueScrollTo.scrollTo(this.$route.hash, 500, {
          offset: -20
        })
      }

    })

  },
  beforeDestroy: function() {
    this.removeListeners()
  },

  // link intercept idea from: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  
  methods: {
    navigate(event) {
      const href = event.target.getAttribute('href')
      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      }
    },
    addListeners() {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      if(this._links) {
        for (let i = 0; i < this._links.length; i++) {
          this._links[i].removeEventListener('click', this.navigate, false)
        }
        this._links = []
      }
    }
  },

  computed: {
    search() {
      return this.$store.state.search.string
    },
    initDrift() {

      // drift for drift@phage.directory
      if(this.$store.state.policy && !this.$store.state.drift) {
        this.$store.dispatch('updateCreate', {drift: true}
          )
        !function() {
          var t = window.driftt = window.drift = window.driftt || [];
          if (!t.init) {
            if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
            t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
            t.factory = function(e) {
              return function() {
                var n = Array.prototype.slice.call(arguments);
                return n.unshift(e), t.push(n), t;
              };
            }, t.methods.forEach(function(e) {
              t[e] = t.factory(e);
            }), t.load = function(t) {
              var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
              o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
              var i = document.getElementsByTagName("script")[0];
              i.parentNode.insertBefore(o, i);
            };
          }
        }();
        drift.SNIPPET_VERSION = '0.3.1';
        drift.load('ks35ggadwzyw');
      }
      return undefined
    }
  }

}




</script>


<style lang="scss" scoped>
</style>
