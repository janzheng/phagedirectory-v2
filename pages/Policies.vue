<template>

  <div class="Policies container">
    <!-- header -->
    <div class="_grid-1-5">
      <div></div>
      <article class="narrow" v-html="$md.render(intro || '')"></article>
    </div>

    <!-- body -->
    <div class="_grid-1-5 _grid-gap-large">

      <div class="SideNav _sidebar">
        <div class="_sidebar-content">
          <router-link to="#terms">Terms of Use</router-link>
          <router-link to="#privacy">Privacy Policy</router-link>
          <router-link to="#alerts">Phage Alerts</router-link>
          <router-link to="#cookies">Cookies Policy</router-link>
        </div>
      </div>

      <article class="Policies-content narrow">
        <div class="" v-html="$md.render(policies || '')"></div>
      </article>
    </div>

  </div>
</template>

<script>

export default {

  components: {
  },
  
  layout: 'contentframe',
  middleware: 'pageload',
  
  async asyncData({app, env, route, store}) {
    const cytosis = store.state.cytosis
    return {
      intro: app.$cytosis.find('Content.policies-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      policies: app.$cytosis.find('Content.site-policy', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    return {
    }
  },

  mounted: function () {
  },

  computed: {
  },


  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

