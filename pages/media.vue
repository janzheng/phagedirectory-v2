<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Media">
    <section class="narrow copy _margin-center">
      <div class="Media-content">
        <div class="" v-html="$md.render(media || '')"></div>
      </div>

    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  async asyncData({app, env, route, store}) {
    // const cytosis = store.state.cytosis.tables
    
    // if(!store.state.cytosis.tables)
    //   return false

    return {
      media: app.$cytosis.find('Content.media-content', store.state.cytosis.tables)[0]['fields']['Markdown']
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),
  },

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
    }
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

