
<!-- 

  NEWS: covers the main /capsid/ list

 -->

<template>
  <div>
    <section class="Capsid narrow copy _margin-center ">

      <div class="Capsid-intro _margin-bottom _flex _flex-bottom">
        <div class="" v-html="$md.render(title)"></div>
        <div class="" v-html="$md.render(intro)"></div>    
      </div>

      <div class="Capsid-content _margin-bottom" v-html="$md.render(highlight)">
      </div>
      <CapsidBanner class="_margin-center" />

    </section>
    

    <!-- <Capsid :issues="latest" :isFeatured="true" /> -->
    <CapsidStub :issues="latest" :isFeatured="true" />
    <CapsidStub :issues="notLatest" class="_padding-bottom-2" />

  </div>
</template>

<script>

import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import Capsid from '~/components/Capsid.vue'
import CapsidStub from '~/components/CapsidStub.vue'
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
    Article,
    CapsidBanner,
    Capsid,
    CapsidStub,
  },

  layout: 'contentframe',
  middleware: 'pageload',


  async asyncData({app, env, route, store}) {

    // somehow this is getting cached?!
    const newsData = await store.dispatch('loadCytosis', {
      env,
      tableIndex: 'capsid',
      caller: 'capsidlist',
    })

    const slug = unescape(route.params.slug)
    console.log('News loaded:', newsData)

    return {
      title: app.$cytosis.find('Content.capsid-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      intro: app.$cytosis.find('Content.capsid-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      highlight: app.$cytosis.find('Content.capsid-highlight', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
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

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

