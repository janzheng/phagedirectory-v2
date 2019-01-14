<!-- 

  - We started out as a side project for the phage therapy community
  - It's become a time-intensive project, and something we're very passionate about
  - Ads + Jobs are a good way to support us
  - SUPPORT US / Supporter button
  - fake patreon / let us know how you'd support us


 -->
<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Services _section-page _margin-center">
    <div class="_padding-bottom" v-html="$md.render(intro || '')" />

    <section id="overview" class="_section-content _margin-center">
      <div class="_section-article _margin-center">
        <div class="" v-html="$md.render(overview || '')" />
      </div>
    </section>

    <section v-if="ads" id="ads" class="_section-content _margin-center">
      <div class="_section-article _margin-center">
        <div class="" v-html="$md.render(ads || '')" />
      </div>
    </section>

    <section v-if="jobs" id="jobs" class="_section-content _margin-center">
      <div class="_section-article _margin-center">
        <div class="" v-html="$md.render(jobs || '')" />
      </div>
    </section>

    <section v-if="consulting" id="consulting" class="_section-content _margin-center">
      <div class="_section-article _margin-center">
        <div class="" v-html="$md.render(consulting || '')" />
      </div>
    </section>
    <!-- 
    <div class="_grid-1-5 _grid-gap-large">

      <div class="SideNav _sidebar">
        <div class="_sidebar-content">
          <router-link to="#terms">Advertise with us</router-link>
          <router-link to="#privacy">Privacy Policy</router-link>
          <router-link to="#alerts">Phage Alerts</router-link>
          <router-link to="#cookies">Cookies Policy</router-link>
        </div>
      </div>

      <div class="_section-article">
        <div class="" v-html="$md.render(content || '')" />
      </div>
    </div>
     -->


  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  head () {
    const title = "Services"

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
      intro: app.$cytosis.find('Content.services-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      overview: app.$cytosis.find('Content.services-overview', store.state.cytosis.tables)[0]['fields']['Markdown'],
      ads: app.$cytosis.find('Content.services-ads', store.state.cytosis.tables)[0]['fields']['Markdown'],
      jobs: app.$cytosis.find('Content.services-jobs', store.state.cytosis.tables)[0]['fields']['Markdown'],
      consulting: app.$cytosis.find('Content.services-consulting', store.state.cytosis.tables)[0]['fields']['Markdown'],
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

