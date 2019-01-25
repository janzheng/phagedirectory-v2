
<!-- 

  Job: Covers one single job / deep job page from a slug

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

    const job = this.job
    const title = job.fields['Name']
    const description = job.fields['Markdown']
    // use the second image if it exists, as a large banner,
    // otherwise use the first image?, or nothing
    const image = job.fields['Attachments'][1] ? job.fields['Attachments'][1]['url'] : undefined

    let meta = [
      { hid: 'og-title', property: 'og:title', content: `${title}` },
      { hid: 'twitter-title', property: 'twitter:title', content: `${title}` },

      { hid: 'og-image', property: 'og:image', content: `${image}` },
      { hid: 'twitter-image', property: 'twitter:image', content: `${image}` },

      { hid: 'twitter-description', property: 'twitter:description', content: `${description}` },
      { hid: 'og-description', property: 'og:description', content: `${description}` },
      { hid: 'description', name: 'description', content: `${description}` },
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

