
<!-- 

  NEWS: covers the main /capsid/ list

 -->

<template>
  <div class="Capsid _section-page _margin-center">
    <div class="Capsid _section-content _margin-center ">

      <div class="Capsid _section-content _margin-center _center ">
        <!-- <div class="Capsid-intro _margin-bottom _flex _flex-vertically"> -->
        <!-- <div class="Capsid-intro _margin-bottom _grid-2-3 _align-vertically"> -->
        <div class="" v-html="$md.render(title)" />
        <!-- <div class="" v-html="$md.render(intro)" />     -->
        <!-- </div> -->
      </div>

      <!-- <CapsidBanner /> -->
      <div class="Capsid-content _margin-bottom" v-html="$md.render(highlight)" />
    </div>

    <!-- <Capsid :issues="latest" :isFeatured="true" /> -->
    <CapsidStub :issues="latest" :is-featured="true" class="_section-article _margin-center" />

    <CapsidBanner class="_section-content _margin-center _margin-top-2 _margin-bottom-2" />

    <CapsidStub :issues="notLatest" class="_section-article _margin-center _padding-bottom-2" />

    <FormCapsidFeedback class="_section-article _margin-center _margin-bottom-2"/>

  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
// import Capsid from '~/components/Capsid.vue'
import CapsidStub from '~/components/CapsidStub.vue'
import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
import { mapState } from 'vuex'


export default {

  head () {

    let title = "Capsid & Tail"
    let description = "Capsid & Tail is a micro-publication about all things phages"
    let meta = [
      { hid: 'og-title', property: 'og:title', content: `${title}` },
      { hid: 'twitter-title', property: 'twitter:title', content: `${title}` },

      { hid: 'twitter-description', property: 'twitter:description', content: `${description}` },
      { hid: 'og-description', property: 'og:description', content: `${description}` },
      { hid: 'description', name: 'description', content: `${description}` },
    ]

    return {
      title,
      meta,
    }
  },

  components: {
    CapsidBanner,
    CapsidStub,
    FormCapsidFeedback,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_basic",
    // tableQuery: "_capsid-titles",
    tableQueries: ["_capsid-content", "_capsid-titles"] // combine queries
  },


  // async asyncData({app, env, route, store}) {
  async asyncData({route}) {

    // somehow this is getting cached?!
    // const newsData = await store.dispatch('loadCytosis', {
    //   env,
    //   tableQuery: 'capsid',
    //   caller: 'capsidlist',
    // })

    const slug = unescape(route.params.slug)
    // console.log('News loaded:', newsData)

    return {
      slug,
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
      title: this.$cytosis.find('Content.capsid-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      highlight: this.$cytosis.find('Content.capsid-highlight', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Content',
      'C&T',
      'Articles',
      ]),

    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      return [this['C&T'][0]] // return an array of the first issue only
    },

    notLatest() {
      return this['C&T'].slice(1)
    },

    issues() {
      return this['C&T']
    }

  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

