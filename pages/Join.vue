<template>

  <div class="Join">
    <section class="narrow copy _width-content-max _margin-center " >
      <div class="Join-intro" v-html="$md.render(intro || '')"></div>
    </section>


    <div class="Join-options _padding-2" v-if="mode=='select'" 
         :class="JoinOptionsClasses"
    >
      <div class="Join-research Join-grid _card _padding" v-if="researchFormPublished">
        <div class="_margin-bottom" v-html="$md.render(researchFormIntro || '')"></div>
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" v-html="$md.render(joinCta || '')" @click="mode='research'"></div>
      </div>

      <div class="Join-research Join-grid _card _padding" v-if="labFormPublished">
        <div class="_margin-bottom" v-html="$md.render(labFormIntro || '')"></div>
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" v-html="$md.render(joinCta || '')" @click="mode='lab'"></div>
      </div>

      <div class="Join-industry Join-grid _card _padding" v-if="industryFormPublished">
        <div class="_margin-bottom" v-html="$md.render(industryFormIntro || '')"></div>
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" v-html="$md.render(joinCta || '')" @click="mode='industry'">CTA</div>
      </div>
    </div>

    <section class="narrow copy _card Join-form _width-content-max _margin-center _padding" v-if="mode!=='select'">
      <div class="Join-back _button --short Directory-btn" @click="mode='select'">Back</div>
      <FormVomResearch v-if="mode=='research'"/>
      <FormVomLab v-if="mode=='lab'"/>
      <FormVomIndustry v-if="mode=='industry'"/>
    </section>

  </div>
</template>

<script>

import { mapState } from 'vuex'

import FormVomIndustry from '~/forms/FormVomIndustry.vue'
import FormVomLab from '~/forms/FormVomLab.vue'
import FormVomResearch from '~/forms/FormVomResearch.vue'

export default {

  components: {
    FormVomIndustry,
    FormVomLab,
    FormVomResearch
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {

    const cytosis = store.state.cytosis
    return {
      postUrl: env.ext_handler,
      cytosis,

      intro: app.$cytosis.find('Content.join-intro', cytosis.tables)[0]['fields']['Markdown'],

      researchFormIntro: app.$cytosis.find('Content.join-research', cytosis.tables)[0]['fields']['Markdown'],
      researchFormPublished: true, //app.$cytosis.find('Content.join-research-form', cytosis.tables)[0]['fields']['isPublished'] || false,
      
      labFormIntro: app.$cytosis.find('Content.join-lab', cytosis.tables)[0]['fields']['Markdown'],
      labFormPublished: true, //app.$cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['isPublished'] || false,
      
      industryFormIntro: app.$cytosis.find('Content.join-industry', cytosis.tables)[0]['fields']['Markdown'],
      industryFormPublished: true, //app.$cytosis.find('Content.join-industry-form', cytosis.tables)[0]['fields']['isPublished'] || false,

      thanks: app.$cytosis.find('Content.join-form-thanks', cytosis.tables)[0]['fields']['Markdown'],
      joinCta: app.$cytosis.find('Content.join-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: app.$cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
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

