<template>
  <Directory />
</template>

<script>

// import {loadStatic, loadDynamic} from '~/other/loaders'
import Directory from '~/components/Directory.vue'

export default {

  components: {
    Directory,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_directory"
  },

  // async asyncData({app, env, route, store}) {
  async asyncData({route}) {

    const slug = unescape(route.params.slug)

    return {
      slug,
    }
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.updates-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // title: this.$cytosis.find('Content.updates-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  mounted: async function () {
  },

  methods: {
  }
}

</script>

<style lang="scss" scoped>

</style>

