<template>

  <ContentFrame class="Policies container">
    <!-- header -->
    <div class="_grid-1-5">
      <div></div>
      <div>
        <h1 class="Policies-title">Site Policies</h1>
      </div>
    </div>

    <!-- body -->
    <div class="_grid-1-5">

      <div class="SideNav _sidebar">
        <div class="_sidebar-content">
          <router-link href="#typography" to="#typography">Typography</router-link>
          <router-link href="#forms" to="#forms">Forms</router-link>
        </div>
      </div>

      <div class="Policies-content">
        <div class="" v-html="content('Content.site-policy')"></div>
      </div>
    </div>

  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame
  },

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    console.log('store cytosis: ' , store.state)
    return {
      cytosis: _cytosis
    }
  },

  data: function () {
    // console.log('policies data:', this.cytosis, this)
    return {
      cytosis: this.$store.cytosis,
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

