
<!-- 

  Jobs page
  - keep it very flat and simpel

 -->

<template>
  <div>
    <div class="Jobs _section-page _margin-center ">

      <div class="Jobs-intro _section-content _margin-center" v-html="$md.render(intro)" />
      <div class="_section-content _margin-center Jobs-container">

        <!-- 

          Paid, Active Jobs

        -->
        <div v-if="sponsoredJobs.length > 0" class="Jobs-industry _margin-bottom-4">
          <h6 class="Jobs-sectiontitle">Sponsored Jobs</h6>
          <div v-for="job of sponsoredJobs" v-if="showJob(job)" :key="job.id"
               :class="getJobStatus(job)">
            <Job :job="job" class="Jobs-item _card _margin-bottom _padding"/>
          </div>
        </div>


        <!-- 

          Jobs Stream // all jobs including expired

        -->
        <div v-if="academicJobs.length > 0" class="Jobs-industry _margin-bottom-4">
          <h6 class="Jobs-sectiontitle">Academic Jobs</h6>
          <div v-for="job of academicJobs" v-if="showJob(job)" :key="job.id"
               :class="getJobStatus(job)">
            <Job :job="job" class="Jobs-item _card _margin-bottom _padding"/>
          </div>
        </div>


        <!-- 

          Expired jobs show up last

         -->
        <div v-if="expiredJobs.length > 0" class="Jobs-expired _margin-bottom-4">
          <h6 class="Jobs-sectiontitle">Expired Jobs</h6>
          <div v-for="job of expiredJobs" v-if="showJob(job)" :key="job.id"
               :class="getJobStatus(job)">
            <Job :job="job" class="Jobs-item _card _margin-bottom _padding"/>
          </div>
        </div>



      </div>    

    </div>

  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import Job from '~/components/Job.vue'
import { mapState } from 'vuex'


export default {
  head () {
    const title = "Phage Directory Jobs"
    const headDescription = "Make a difference with your phage expertise!"

    let meta = [
      { hid: 'og-title', property: 'og:title', content: `${title}` },
      { hid: 'twitter-title', property: 'twitter:title', content: `${title}` },

      { hid: 'twitter-description', property: 'twitter:description', content: `${headDescription}` },
      { hid: 'og-description', property: 'og:description', content: `${headDescription}` },
      { hid: 'description', name: 'description', content: `${headDescription}` },
    ]

    return {
      title,
      meta,
    }

  },

  components: {
    // Article,
    CapsidBanner,
    Job
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_jobs"
  },



  // async asyncData({app, env, route, store}) {
  // async asyncData({app, store}) {

  //   // const slug = unescape(route.params.slug)
  //   return {
  //   }
  // },

  data: function () {
    // console.log('Joblist data:', this.$store.state['Content'])
    return {
      intro: this.$cytosis.find('Content.jobs-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Jobs',
      ]),

    industryJobs() {
      let results = []
      for (let job of this.Jobs) {
        if(job.fields['Type'] == 'Industry' && job.fields['Status'] != 'Expired') {
          results.push(job)
        }
      }
      return results
    },

    sponsoredJobs() {
      let results = []
      for (let job of this.Jobs) {
        if(job.fields['isSponsored'] && job.fields['Status'] != 'Expired') {
          results.push(job)
        }
      }
      return results
    },

    academicJobs() {
      let results = []
      for (let job of this.Jobs) {
        if(job.fields['Type'] == 'Academic' && job.fields['Status'] != 'Expired') {
          results.push(job)
        }
      }
      return results
    },

    expiredJobs() {
      let results = []
      for (let job of this.Jobs) {
        if(job.fields['Status'] == 'Expired') {
          results.push(job)
        }
      }
      return results
    }
  },

  mounted: async function () {
  },

  methods: {
    getAttachment(job) {
      // currently only works for the first attachment
      if(job.fields['Attachments']) {
        // console.log('attachments', job.fields['Attachments'][0]['url'])
        return job.fields['Attachments'][0]['url']
      }
    },

    showJob(job) {
      if (!job.fields['isPublished'])
        return undefined 

      // if (job.fields['Status'] == 'Expired')
      //   return undefined 

      if (Date(job.fields['ExpirationDate']) < Date.now())
        return undefined 

      return true
    },

    getJobStatus(job) {
      // todo: return 'Active' if now < expiration date, 'Expired' otherwise
      // return 'Active'
      // const exp = Date(job.fields['ExpirationDate'])
      // const now = Date.now()
      // console.log('??',job)
      return job.fields['Status'] || undefined
    },


  }

}
</script>


<style lang="scss" scoped>

</style>

