
<!-- 

  This is used as the Mailchimp Thanks page

 -->
<template>

  <section class="SignedUp _section-page">
    <div v-html="$md.render(signedup || '')" />
  </section>

</template>

<script>

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_basic"
  },

  // async asyncData({app, env, route, store}) {
  // async asyncData({app, env, store}) {
  //   return {
  //   }
  // },

  data: function () {
    return {
      signedup: this.$cytosis.find('Content.capsid-signedup', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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

