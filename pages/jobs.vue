
<!-- 

  Jobs page
  - keep it very flat and simpel

 -->

<template>
  <div>
    <section class="Jobs narrow copy _margin-center _padding-top-2">

      <div class="Jobs-intro _margin-bottom-2" v-html="$md.render(intro)"></div>

      <div class="Jobs-container">
        <div class="Jobs-item _card _margin-bottom-2 _padding-2" 
          :class="getStatus"
          v-for="job of Jobs" :key="job.id" v-if="showJob(job)">
          <div class="Job-meta">
            <div class="Job-status _margin-bottom" v-if="getStatus(job)">
              <span class="_tag">{{ getStatus(job) }}</span>
            </div>
            <div class="Job-posted _font-small">
              {{ job.fields['PostedDate'] | niceDate }}
            </div>
          </div>
          <a class="Job-link" :href="job.fields['URL']">
            <h4 class="Job-title">{{ job.fields['Name'] }}</h4>
          </a>
          <div>
            <div class="Job-org _font-bold" >{{ job.fields['Org'] }}</div>
            <p class="Job-org" v-if="job.fields['Supervisor']">{{ job.fields['Supervisor'] }}</p>
          </div>
          <div class="Job-description" 
            v-html="$md.render(job.fields['Markdown'] || '')">    
          </div>
          <div class="Job-tags">
            <span class="_tag" v-for="tag of job.fields['Tags']" :key="tag">{{ tag }}</span>
          </div>
          
        </div>
      </div>    


    </section>

  </div>
</template>

<script>

import Article from '~/components/Article.vue'
import MailchimpBanner from '~/components/MailchimpBanner.vue'
import { mapState } from 'vuex'


export default {

  components: {
    Article,
    MailchimpBanner,
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {

    const slug = unescape(route.params.slug)
    return {
      intro: app.$cytosis.find('Content.jobs-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
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
      'Jobs',
      ]),
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

