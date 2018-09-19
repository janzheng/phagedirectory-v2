<template>
  <Directory />
</template>

<script>

import Directory from '~/components/Directory.vue'

export default {

  components: {
    Directory,
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {
    const cytosis = store.state.cytosis

    const slug = unescape(route.params.slug)
    const article = app.$cytosis.find(slug, [store.state.Blog], ['Slug'])

    if (article && article.fields.isPublished == false)
      this.article = undefined

    return {
      intro: app.$cytosis.find('Content.updates-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      title: app.$cytosis.find('Content.updates-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
      article
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

