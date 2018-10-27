<template>
  <Directory />
</template>

<script>

import {loadStatic, loadDynamic} from '~/other/loaders'
import Directory from '~/components/Directory.vue'

export default {

  components: {
    Directory,
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {

    const staticData = await loadStatic(env, store, route.name)
    const dynamicData = await loadDynamic(env, store, route.name)

    const slug = unescape(route.params.slug)

    return {
      intro: app.$cytosis.find('Content.updates-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      title: app.$cytosis.find('Content.updates-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
    }
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
  },

  methods: {
  }
}

</script>

<style lang="scss" scoped>

</style>

