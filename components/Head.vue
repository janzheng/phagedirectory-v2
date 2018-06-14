<template>
  <section class="Head container">
  </section>
</template>


<script>

import {fetchCytosis} from '~/assets/helpers.js'


export default {

  props: [],

  components: {
  },

  data: function () {
    return {
      projects: this.$store.state.Projects,
      content: this.$store.state.Content,
      orgs: this.$store.state.Organizations,
      tags: this.$store.state.Tags,
      blog: this.$store.state.Blog,
    }
  },

  async fetch({ store, params }) {
    return fetchCytosis(store, params)
  },

  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  mounted: function () {
  },

}
</script>


<style lang="scss" scoped>
</style>
