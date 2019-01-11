<template>

  <div class="About _section-page _margin-center">

    <div class="_section-content _margin-center">

      <div class="_section-article _margin-center">
        <h1 class="About-title _section-article">
          {{ aboutTitle }}
        </h1>

        <div class="About-bg">
          <div class="" v-html="$md.render(aboutBg || '')" />
        </div>

        <div class="About-us">
          <div class="" v-html="$md.render(aboutUs || '')" />
        </div>

        <div class="ProfileCard _padding">
          <div class="" v-html="$md.render(jess || '')" />
        </div>

        <div class="ProfileCard _padding">
          <div class="" v-html="$md.render(jan || '')" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  head () {
    const title = "About Phage Directory"

    return {
      title,
    }
  },

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  async asyncData({app, store}) {
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

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

