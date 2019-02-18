<template>

  <div class="Policies _section-page _margin-center">
    <div class="_section-content _margin-center">
      <div />
      <div class="" v-html="$md.render(intro || '')" />
    </div>

    <div class="_grid-1-5 _grid-gap-large">

      <div class="SideNav _sidebar">
        <div class="_sidebar-content">
          <router-link to="#terms">Terms of Use</router-link>
          <router-link to="#privacy">Privacy Policy</router-link>
          <router-link to="#alerts">Phage Alerts</router-link>
          <router-link to="#cookies">Cookies Policy</router-link>
        </div>
      </div>

      <div class="Policies-content">
        <div class="" v-html="$md.render(policies || '')" />
      </div>
    </div>

  </div>
</template>

<script>

export default {
  head () {
    const title = "Site Policy"

    return {
      title,
    }
  },

  components: {
  },
  
  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_basic",
    // tableQueries: ["_basic", "_alerts"] // combine queries
  },
  
  // async asyncData({app, env, route, store}) {
  // async asyncData({app, store}) {
  //   // const cytosis = store.state.cytosis
  //   return {
  //   }
  // },

  data: function () {
    return {
      intro: this.$cytosis.find('Content.policies-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      policies: this.$cytosis.find('Content.site-policy', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

