<template>
  <ContentFrame class="Design container">
    <Directory /> 
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Directory from '~/components/Directory.vue'

import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame,
    Directory,
  },

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.statecytosis,
    }
  },

  mounted: async function () {
  },

  computed: {
  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
  }
}

</script>

<style lang="scss" scoped>

</style>

