
<!-- 

  Jobs page
  - keep it very flat and simpel

 -->

<template>
  <div>
    <div class="Jobs _section-page _margin-center ">

      <div class="Jobs-intro _section-content _margin-center" v-html="$md.render(intro)" />

      <div class="_section-article _margin-center Jobs-container">

        <!-- 

          Paid, Active Jobs

        -->


        <!-- 

          Jobs Stream // all jobs including expired

        -->
        <div v-for="job of Jobs" v-if="showJob(job)" :key="job.id"
             :class="getStatus(job)"
             class="Jobs-item _card _margin-bottom-2 _padding">

          <div class="Job-meta">
            <div class="_grid-2-1 _margin-bottom-half">
              <!-- <div class="Job-org " >{{ job.fields['Org'] }}</div> -->
              <div>
                <div v-if="getStatus(job)" class="Job-status _margin-bottom">
                  <span class="_tag">{{ getStatus(job) }}</span>
                </div>
                <div v-if="getAttachment(job)" class="Job-org-logo _margin-bottom-half" >
                  <img :src="getAttachment(job)" alt="Job logo">
                </div>
              </div>
              <div class="Job-date _right-sm">
                {{ job.fields['PostedDate'] | niceDate }}
              </div>
            </div>
          </div>


          <!-- <div class="Job-meta">
            <div class="_grid-2 _margin-bottom-half">
              <div class="Job-org " >{{ job.fields['Org'] }}</div>
              <div class="Job-date _right-sm">
                {{ job.fields['PostedDate'] | niceDate }}
              </div>
            </div>
          </div> -->
          <!-- <div>
            <div class="Job-org _font-bold" >{{ job.fields['Org'] }}</div>
          </div> -->
          <a :href="job.fields['URL']" class="Job-link">
            <h4 class="Job-title">{{ job.fields['Name'] }}</h4>
          </a>
          <!-- <div class="Job-org _margin-bottom" >{{ job.fields['Org'] }}</div> -->

          <!-- <div class="Job-meta">
            <div class="_grid-2 _margin-bottom-half">
              <div class="Job-org " >{{ job.fields['Org'] }}</div>
              <div class="Job-date _right-sm">
                {{ job.fields['PostedDate'] | niceDate }}
              </div>
            </div>
          </div> -->
          <div class="Job-org" >{{ job.fields['Org'] }}</div>

          <div v-if="job.fields['Supervisor']" >
            <p class="Job-supervisor">{{ job.fields['Supervisor'] }}</p>
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
    getAttachment(job) {
      // currently only works for the first attachment
      if(job.fields['Attachments']) {
        console.log('attachments', job.fields['Attachments'][0]['url'])
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

