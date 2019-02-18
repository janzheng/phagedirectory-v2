<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Brand _section-page">
    <section class="_section-content _margin-center">
      <div class="_section-article">
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
  meta: {
    tableQuery: "_basic"
  },
  
  fetch() {
  },

  // async asyncData({app, store}) {
  //   return {
  //   }
  // },

  data: function () {
    return {
      media: this.$cytosis.find('Content.media-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown']
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

