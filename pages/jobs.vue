
<!-- 

  Jobs page
  - keep it very flat and simpel

 -->

<template>
  <div>
    <section class="Jobs narrow copy _margin-center _padding-top-2">

      <div class="Jobs-intro _margin-bottom-2" v-html="$md.render(intro)"></div>


      <div class="Jobs-container">
        <div class="Jobs-item _card _margin-bottom-2 _padding-2" v-for="job of Jobs" :key="job.id" v-if="job.fields['isPublished']">
          <div class="Job-status">
            <span class="_tag">{{ getStatus }}</span>
          </div>
          <div class="Job-posted">
            Posted: {{ job.fields['PostedDate'] | 'niceDate'}}
          </div>
          <div class="Job-title">{{ job.fields['Name'] }}</div>
          <div class="Job-description" 
            v-html="$md.render(job.fields['Markdown'] || '')">    
          </div>
          <div class="Job-link"><a :href="job.fields['URL']">Apply Here</a></div>
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

    getStatus() {
      // todo: return 'Active' if now < expiration date, 'Expired' otherwise
      return 'Active'
      // job.fields['Status']
    }

  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

