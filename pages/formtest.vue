<template>

  <div class="Home">

    <h3>FormSimple Test </h3>

    <FormSimple class=""
          :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          :errorMsg="error"
          table="Dynamic"
          :postUrl="postUrl"
          :alert="true"
    >
    </FormSimple>

 
  </div>
</template>




<script>

import FormSimple from '~/components/FormSimple.vue'

import { mapState } from 'vuex'
// import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'
export default {

  // props: ['postUrl'],
  components: {
    FormSimple,
  },

  data: function () {
    const cytosis = this.$store.state.cytosis
    return {
      postUrl: this.$store.state.ext_handler,
      intro: this.$cytosis.find('Content.capsid-form', cytosis.tables)[0]['fields']['Markdown'],
      source: this.$cytosis.find('Content.capsid-form', cytosis.tables)[0]['fields']['JSON'],
      isPublished: this.$cytosis.find('Content.capsid-form', cytosis.tables)[0]['fields']['isPublished'],
      
      error: this.$cytosis.find('Content.error-form', cytosis.tables)[0]['fields']['Markdown'],
      thanks: this.$cytosis.find('Content.capsid-thanks', cytosis.tables)[0]['fields']['Markdown'],
      cta: this.$cytosis.find('Content.capsid-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: this.$cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  layout: 'contentframe',
  // middleware: 'pageload',

  async asyncData({app, env, route, store}) {
    // console.log('asyncdata store: ', store.state.cytosis)
    // const cytosis = await store.dispatch('loadCytosis', {
    //   env,
    //   tableIndex: 'static',
    // })
    return {
      postUrl: env.ext_handler,
      cytosis: store.state.cytosis,
      intro: app.$cytosis.find('Content.home-intro-new', store.state.cytosis.tables)[0]['fields']['Markdown']
    }
  },

  mounted: function () {
  },

  computed: {
    ...mapState([
      'Content',
      ]),

  },

  methods: {
  },


}
</script>

<style>
</style>

