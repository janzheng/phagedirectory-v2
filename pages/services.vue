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
  meta: {
    tableQuery: "_basic"
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
      intro: this.$cytosis.find('Content.services-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      overview: this.$cytosis.find('Content.services-overview', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      ads: this.$cytosis.find('Content.services-ads', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      jobs: this.$cytosis.find('Content.services-jobs', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      consulting: this.$cytosis.find('Content.services-consulting', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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

