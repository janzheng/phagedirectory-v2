
<!-- 

  Jobs page
  - keep it very flat and simpel

 -->

<template>
  <div>
    <div class="Jobs Section-Page _margin-center ">

      <div class="Jobs-intro Section-Content _margin-center" v-html="$md.render(intro)" />

      <div class="Section-Article _margin-center Jobs-container">
        <div v-for="job of Jobs" v-if="showJob(job)" :key="job.id"
             :class="getStatus(job)"
             class="Jobs-item _card _margin-bottom-2 _padding-2">
          <div class="Job-meta">
            <div v-if="getStatus(job)" class="Job-status _margin-bottom">
              <span class="_tag">{{ getStatus(job) }}</span>
            </div>
            <div class="Job-posted _font-small">
              {{ job.fields['PostedDate'] | niceDate }}
            </div>
          </div>
          <a :href="job.fields['URL']" class="Job-link">
            <h4 class="Job-title">{{ job.fields['Name'] }}</h4>
          </a>
          <div>
            <div class="Job-org _font-bold _padding-bottom" >{{ job.fields['Org'] }}</div>
            <p v-if="job.fields['Supervisor']" class="Job-supervisor">{{ job.fields['Supervisor'] }}</p>
          </div>
          <div class="Job-description" v-html="$md.render(job.fields['Markdown'] || '')" />
          <div class="Job-tags">
            <span v-for="tag of job.fields['Tags']" :key="tag" class="_tag">{{ tag }}</span>
          </div>
          
        </div>
      </div>    

    </div>

  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import { mapState } from 'vuex'


export default {
  head () {
    const title = "Phage Jobs"

    return {
      title,
    }
  },

  components: {
    // Article,
    CapsidBanner,
  },

  layout: 'contentframe',
  middleware: 'pageload',


  // async asyncData({app, env, route, store}) {
  async asyncData({app, store}) {

    // const slug = unescape(route.params.slug)
    return {
      intro: app.$cytosis.find('Content.jobs-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    return {
    }
  },

  computed: {
    ...mapState([
      'Content',
      'Jobs',
      ]),
  },

  mounted: async function () {
  },

  methods: {
    showJob(job) {
      if (!job.fields['isPublished'])
        return undefined 

      // if (job.fields['Status'] == 'Expired')
      //   return undefined 

      if (Date(job.fields['ExpirationDate']) < Date.now())
        return undefined 

      return true
    },
    getStatus(job) {
      // todo: return 'Active' if now < expiration date, 'Expired' otherwise
      // return 'Active'
      // const exp = Date(job.fields['ExpirationDate'])
      // const now = Date.now()
      // console.log('??',job)
      return job.fields['Status'] || undefined
    }

  }

}
</script>


<style lang="scss" scoped>

</style>

