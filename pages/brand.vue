<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Brand Section-Page">
    <section class="Section-Content _margin-center">
      <div class="Section-Article">
        <div class="" v-html="$md.render(media || '')" />
      </div>
    </section>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  head () {
    const title = "Media"

    return {
      title,
    }
  },

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  async asyncData({app, store}) {
    // const cytosis = store.state.cytosis.tables
    
    // if(!store.state.cytosis.tables)
    //   return false

    return {
      media: app.$cytosis.find('Content.media-content', store.state.cytosis.tables)[0]['fields']['Markdown']
    }
  },

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

