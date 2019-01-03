<template>

  <div class="Join">
    <section class="narrow copy _width-content-max _margin-center " >
      <div class="Join-intro" v-html="$md.render(intro || '')" />
    </section>


    <div v-if="mode=='select'"  
         :class="JoinOptionsClasses"
         class="Join-options _padding-2"
    >
      <div v-if="researchFormPublished" class="Join-research Join-grid _card _padding" >
        <div class="_margin-bottom" v-html="$md.render(researchFormIntro || '')" />
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" 
             @click="mode='research'"
             v-html="$md.render(joinCta || '')" />
      </div>

      <div v-if="labFormPublished" class="Join-research Join-grid _card _padding" >
        <div class="_margin-bottom" v-html="$md.render(labFormIntro || '')" />
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix"
             @click="mode='lab'"
             v-html="$md.render(joinCta || '')" />
      </div>

      <div v-if="industryFormPublished" class="Join-industry Join-grid _card _padding" >
        <div class="_margin-bottom" v-html="$md.render(industryFormIntro || '')" />
        <div class="Join-cta _button Directory-btn _width-full _md-p_fix" 
             @click="mode='industry'"
             v-html="$md.render(joinCta || '')" >CTA</div>
      </div>
    </div>

    <section v-if="mode!=='select'"
             class="narrow copy _card Join-form _width-content-max _margin-center _padding" >
      <div class="Join-back _button --short Directory-btn" @click="mode='select'">Back</div>
      <FormVomResearch v-if="mode=='research'"/>
      <FormVomLab v-if="mode=='lab'"/>
      <FormVomIndustry v-if="mode=='industry'"/>
    </section>

  </div>
</template>

<script>

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

  // async asyncData({app, env, route, store}) {
  async asyncData({app, env, store}) {

    const cytosis = store.state.cytosis
    return {
      postUrl: env.ext_handler,
      cytosis,

      intro: app.$cytosis.find('Content.join-intro', cytosis.tables)[0]['fields']['Markdown'],

      researchFormIntro: app.$cytosis.find('Content.join-research', cytosis.tables)[0]['fields']['Markdown'],
      researchFormPublished: app.$cytosis.find('Content.join-research-form', cytosis.tables)[0]['fields']['isPublished'] || false,
      
      labFormIntro: app.$cytosis.find('Content.join-lab', cytosis.tables)[0]['fields']['Markdown'],
      labFormPublished: app.$cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['isPublished'] || false,
      
      industryFormIntro: app.$cytosis.find('Content.join-industry', cytosis.tables)[0]['fields']['Markdown'],
      industryFormPublished: app.$cytosis.find('Content.join-industry-form', cytosis.tables)[0]['fields']['isPublished'] || false,

      thanks: app.$cytosis.find('Content.join-form-thanks', cytosis.tables)[0]['fields']['Markdown'],
      joinCta: app.$cytosis.find('Content.join-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: app.$cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    return {
      mode: 'select'
    }
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

  mounted: function () {
    this.$mixpanel.track("Join page loaded")
  },

  created: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

