<template>

  <ContentFrame class="Join">
    <section class="narrow copy _width-content-max _margin-center " >
      <div class="Join-intro" v-html="$md.render(intro || '')"></div>
    </section>


    <div class="Join-options _padding-2" v-if="mode=='select'" 
         :class="JoinOptionsClasses"
    >
      <div class="Join-research Join-grid _card _padding" v-if="researchFormPublished">
        <div class="_margin-bottom" v-html="$md.render(researchFormContent || '')"></div>
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" v-html="$md.render(joinCta || '')" @click="mode='research'"></div>
      </div>
<!-- 
      <div class="Join-lab Join-grid _card" v-if="find('Content.join-lab-form').get('isPublished')">
        <div class="_margin-bottom" v-html="content('Content.join-lab')"></div>
        <div class="Join-cta _button Directory-btn _width-full" v-html="rawContent('Content.join-cta')" @click="mode='lab'">CTA</div>
      </div>

      <div class="Join-industry Join-grid _card" v-if="find('Content.join-industry-form').get('isPublished')">
        <div class="_margin-bottom" v-html="content('Content.join-industry')"></div>
        <div class="Join-cta _button Directory-btn _width-full" v-html="rawContent('Content.join-cta')" @click="mode='industry'">CTA</div>
      </div>
       -->
    </div>
    

    <section class="narrow copy _card Join-form _width-content-max _margin-center _padding" v-if="mode!=='select'">
      <div class="Join-back _button --short Directory-btn" @click="mode='select'">Back</div>
      <Form class=""
          v-if="mode=='research'" 
          :intro="researchFormContent"
          :source="researchForm"
          :cta="joinCta"
          :thanks="thanks"

          :privacy="privacy"
          errorMsg="Something went wrong, please try again"
          table="Dynamic"
          :postUrl="postUrl"
          :alert="true"
          :json="true"
          notes="FormVomResearch submission"
      >
      </Form>
    </section>

<!-- 
      <div class="Join-cta _grid-2">
        <div>Researchers</div>
        <div>Medical professionals</div>
        <div>Patients</div>
      </div>

      <div class="Join-message">
        the join now / fight message
      </div> -->

  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { mapState } from 'vuex'
import Cytosis from '~/other/cytosis'
import Form from '~/components/Form.vue'

// import FormVomIndustry from '~/forms/FormVomIndustry.vue'
// import FormVomLab from '~/forms/FormVomLab.vue'
// import FormVomResearch from '~/forms/FormVomResearch.vue'

export default {

  components: {
    ContentFrame,
    Form,
    // FormVomIndustry,
    // FormVomLab,
    // FormVomResearch
  },

  middleware: 'pageload',

  async asyncData({env, route, store}) {
    const cytosis = await store.dispatch('loadCytosis', {
      env,
      tableIndex: 'static',
    })
    return {
      postUrl: env.ext_handler,
      cytosis,

      intro: Cytosis.find('Content.join-intro', cytosis.tables)[0]['fields']['Markdown'],

      researchFormContent: Cytosis.find('Content.join-research-form', cytosis.tables)[0]['fields']['Markdown'],
      researchForm: Cytosis.find('Content.join-research-form', cytosis.tables)[0]['fields']['JSON'],
      researchFormPublished: Cytosis.find('Content.join-research-form', cytosis.tables)[0]['fields']['isPublished'],
      
      labForm: Cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['JSON'],
      labFormPublished: Cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['isPublished'],
      
      industryForm: Cytosis.find('Content.join-industry-form', cytosis.tables)[0]['fields']['JSON'],
      industryFormPublished: Cytosis.find('Content.join-industry-form', cytosis.tables)[0]['fields']['isPublished'],

      thanks: Cytosis.find('Content.join-form-thanks', cytosis.tables)[0]['fields']['Markdown'],
      joinCta: Cytosis.find('Content.join-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: Cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
    }
  },


  created: function () {
  },

  data: function () {
    return {
      mode: 'select'
    }
  },

  mounted: function () {
  },

  computed: {
    JoinOptionsClasses: function() {
      let count = 0
      if (this.researchFormPublished) count++
      if (this.labFormPublished) count++
      if (this.industryFormPublished) count++

      if(count == 3) return '--three'
      if(count == 2) return '--two'
      if(count == 1) return '--one'
    }
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

