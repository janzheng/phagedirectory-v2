<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Brand _section-page">
    <section class="_section-content _margin-center">
      <div class="_section-article">
        - We started out as a side project for the phage therapy community
        - It's become a time-intensive project, and something we're very passionate about
        - Ads + Jobs are a good way to support us
        - SUPPORT US / Supporter button
        - fake patreon / let us know how you'd support us
      </div>
    </section>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  head () {
    const title = "Support Us"

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
      intro: app.$cytosis.find('Content.supportus-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      content: app.$cytosis.find('Content.supportus-content', store.state.cytosis.tables)[0]['fields']['Markdown']
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

