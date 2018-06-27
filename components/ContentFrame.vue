<template>
  <div class="ContentFrame container">
    <Header/>
    <div class="_margin-bottom">
      <slot></slot>
    </div>
    <Policy/>
    <Footer/>
  </div>
</template>


<script>


import VueScrollTo from 'vue-scrollto'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Policy from '~/components/Policy.vue'

export default {

  props: [],

  components: {
    Header,
    Footer,
    Policy
  },

  // head () {
  //   return {
  //     title: this.title,
  //     meta: [
  //       { hid: 'description', name: 'description', content: 'My custom description' }
  //     ]
  //   }
  // },


  mounted: function (params) {

    const _this = this
    this.$nextTick(function () {
      this.$router.afterEach((r) => {
        if(_this.$route.hash)
          VueScrollTo.scrollTo(this.$route.hash, 500, {
           offset: -20
         })
        return true
      })

      if(_this.$route.hash)
        VueScrollTo.scrollTo(this.$route.hash, 500, {
          offset: -20
        })

    })
  },

}
</script>


<style lang="scss" scoped>
</style>
