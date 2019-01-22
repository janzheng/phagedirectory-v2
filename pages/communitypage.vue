
<!-- 

  Community: Covers one single community post from a slug

 -->

<template>
  <div class="JobPage _section-page _margin-top _margin-center">
    <JobFull :job="job" class="Jobs-item _section-content _margin-center _margin-bottom-2 "/>
  </div>
</template>

<script>

import JobFull from '~/components/JobFull.vue'

export default {

  components: {
    JobFull,
  },

  head () {

    if(this.isFeatured)
      return {}

    let title = this.job.fields['Name']
    let meta = [
      { hid: 'og-title', property: 'og:title', content: `${this.headTitle}` },
      { hid: 'twitter-title', property: 'twitter:title', content: `${this.headTitle}` },

      { hid: 'og-image', property: 'og:image', content: `${this.headImage}` },
      { hid: 'twitter-image', property: 'twitter:image', content: `${this.headImage}` },

      { hid: 'twitter-description', property: 'twitter:description', content: `${this.headDescription}` },
      { hid: 'og-description', property: 'og:description', content: `${this.headDescription}` },
      { hid: 'description', name: 'description', content: `${this.headDescription}` },
    ]

    return {
      title,
      meta,
    }
  },

  layout: 'contentframe',
  middleware: 'pageload',

  // these are dynamic, and aren't grabbed on generation
  // async asyncData({app, env, route, store}) {

  // },

  data: function () {
    const slug = unescape(this.$route.params.slug)

    let result = this.$cytosis.search(slug, this.$store.state['Jobs'], ['Slug'])
    // console.log('job slug: ', slug, result)

    // result isn't a 100% match, so need to do manual EXACT matching (is this a cytosis bug?)
    // if (result.length > 1) {
    //   for (let job of result) {
    //     // return exact slug match
    //     if (job.fields['Slug'] == slug) {
    //       result = [job]
    //       break
    //     }
    //   }
    // }

    // console.log('job slug: ', result)
    // return job // array of issues

    return {
      job: result[0]
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

