<template>

  <ContentFrame class="Policies container">
    <section class="">
      <!-- header -->
      <div class="_grid-1-5">
        <div></div>
        <article class="narrow" v-html="content('Content.policies-intro')"></article>
      </div>

      <!-- body -->
      <div class="_grid-1-5">

        <div class="SideNav _sidebar">
          <div class="_sidebar-content">
            <router-link to="#terms">Terms of Use</router-link>
            <router-link to="#privacy">Privacy</router-link>
            <router-link to="#alerts">Alerts</router-link>
            <router-link to="#cookies">Cookies</router-link>
          </div>
        </div>

        <article class="Policies-content narrow">
          <div class="" v-html="content('Content.site-policy')"></div>
        </article>
      </div>
    </section>

  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame
  },
  
  middleware: 'pageload',

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    // console.log('store cytosis: ' , store.state)
    return {
      cytosis: _cytosis
    }
  },

  data: function () {
    // console.log('policies data:', this.cytosis, this)
    return {
      cytosis: this.$store.state.cytosis,
    }
  },

  mounted: function () {
  },

  computed: {
  },


  methods: {
    content(findStr) {
      let content = this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
      return this.$md.render(content)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

