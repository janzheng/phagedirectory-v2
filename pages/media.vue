<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Shirt">
    <section class="narrow copy _margin-center">
      <h1 class="Shirt-title title">
        {{aboutTitle}}
      </h1>

      <div class="About-bg">
        <div class="" v-html="$md.render(aboutBg || '')"></div>
      </div>

      <div class="About-us">
        <div class="" v-html="$md.render(aboutUs || '')"></div>
      </div>

      <div class="About-profile _card _padding">
        <div class="" v-html="$md.render(jess || '')"></div>
      </div>

      <div class="About-profile _card _padding">
        <div class="" v-html="$md.render(jan || '')"></div>
      </div>

    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  async asyncData({app, env, route, store}) {
    // const cytosis = store.state.cytosis.tables
    
    // if(!store.state.cytosis.tables)
    //   return false

    return {
      aboutTitle: app.$cytosis.find('Content.about-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      aboutBg: app.$cytosis.find('Content.about-bg', store.state.cytosis.tables)[0]['fields']['Markdown'],
      aboutUs: app.$cytosis.find('Content.about-us', store.state.cytosis.tables)[0]['fields']['Markdown'],
      jess: app.$cytosis.find('Content.about-jess', store.state.cytosis.tables)[0]['fields']['Markdown'],
      jan: app.$cytosis.find('Content.about-jan', store.state.cytosis.tables)[0]['fields']['Markdown'],
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

