
<!-- error page / 404 etc. -->

<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Error">
    <section class="narrow copy _margin-center">
      <h1 class="Error-title title">
        We couldn’t find what you were looking for
      </h1>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  // middleware: 'pageload',
  
  fetch() {
  },

  async asyncData({app, env, route, store}) {
    // const cytosis = store.state.cytosis.tables
    
    // if(!store.state.cytosis.tables)
    //   return false

    return {
      // aboutTitle: app.$cytosis.find('Content.about-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      // aboutBg: app.$cytosis.find('Content.about-bg', store.state.cytosis.tables)[0]['fields']['Markdown'],
      // aboutUs: app.$cytosis.find('Content.about-us', store.state.cytosis.tables)[0]['fields']['Markdown'],
      // jess: app.$cytosis.find('Content.about-jess', store.state.cytosis.tables)[0]['fields']['Markdown'],
      // jan: app.$cytosis.find('Content.about-jan', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),
  },

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
    }
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

