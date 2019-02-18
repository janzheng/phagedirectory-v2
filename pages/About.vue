<template>

  <div class="About _section-page _margin-center">

    <div class="_section-content _margin-center">

      <div class="_section-article _margin-center">
        <h1 class="About-title _section-article">
          {{ aboutTitle }}
        </h1>

        <div class="About-bg">
          <div class="" v-html="$md.render(aboutBg || '')" />
        </div>

        <div class="About-us">
          <div class="" v-html="$md.render(aboutUs || '')" />
        </div>

        <div class="ProfileCard _padding">
          <div class="" v-html="$md.render(jess || '')" />
        </div>

        <div class="ProfileCard _padding">
          <div class="" v-html="$md.render(jan || '')" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  head () {
    const title = "About Phage Directory"

    return {
      title,
    }
  },

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_about"
  },
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  // async asyncData({app, store}) {
  //   return {
  //   }
  // },

  data: function () {
    return {
      aboutTitle: this.$cytosis.find('Content.about-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      aboutBg: this.$cytosis.find('Content.about-bg', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      aboutUs: this.$cytosis.find('Content.about-us', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      jess: this.$cytosis.find('Content.about-jess', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      jan: this.$cytosis.find('Content.about-jan', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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

