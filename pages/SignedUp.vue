
<!-- 

  This is used as the Mailchimp Thanks page

 -->
<template>

  <section class="SignedUp Section-Page">
    <div v-html="$md.render(signedup || '')" />
  </section>

</template>

<script>

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',

  // async asyncData({app, env, route, store}) {
  async asyncData({app, env, store}) {
    // console.log('asyncdata store: ', store.state.cytosis)
    // const cytosis = await store.dispatch('loadCytosis', {
    //   env,
    //   tableIndex: 'static',
    // })
    return {
      postUrl: env.ext_handler,
      cytosis: store.state.cytosis,
      signedup: app.$cytosis.find('Content.capsid-signedup', store.state.cytosis.tables)[0]['fields']['Markdown']
    }
  },

  data: function () {
    return {
    }
  },

  computed: {
  },

  created: function () {
  },
  
  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

