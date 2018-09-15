<template>
  <div class="VomFeedback _card">

    <div v-html="$md.render(vomfeedbackIntro)"></div>
    <!-- <Form class=""
          :intro="vomfeedbackIntro"
          source="vomfeedbackForm"
          :cta="vomfeedbackCta"
          :thanks="vomfeedbackThanks"

          privacy="privacyForms"
          errorMsg="Something went wrong, please try again"
          table="Dynamic"
          :postUrl="postUrl"
          :alert="true"
    >
    </Form> -->
  </div>
</template>

<script>

import Form from '~/components/Form.vue'
import Cytosis from '~/other/cytosis'

import { mapState } from 'vuex'

export default {

  props: ['postUrl'],
  components: {
    Form,
  },

  middleware: 'pageload',

  data: function () {
    return {
    }
  },

  asyncData({ app, store, env, params }) {
    // let cytosis = store.state.cytosis
    // if(!cytosis) {
    //   cytosis = await store.dispatch('loadCytosis', {
    //     env,
    //     tableIndex: 'static',
    //   })
    // }

    // console.log('err: ', Cytosis.find('vomfeedback-intro', cytosis.tables)[0]['fields']['Markdown'],)
    // return {
    //   // cytosis,
    //   banana: 'banana',
    //   // vomfeedbackIntro: Cytosis.find('vomfeedback-intro', cytosis.tables)[0]['fields']['Markdown'],
    //   // vomfeedbackForm: cytosis.find('vomfeedback-form')[0]['fields']['JSON'],
    //   // vomfeedbackCta: cytosis.find('vomfeedback-cta')[0]['fields']['Markdown'],
    //   // vomfeedbackThanks: cytosis.find('vomfeedback-thanks')[0]['fields']['Markdown'],
    //   // privacyForms: cytosis.find('Content.privacy-forms')[0]['fields']['Markdown']
    // }
  },

  computed: {
    ...mapState([
      'cytosis',
      'Content',
      ]),

    vomfeedbackIntro() {
      return Cytosis.find('Content.vomfeedback-intro', this.cytosis.tables)[0]['fields']['Markdown']
    },
  },


  methods: {
    // rawContent(findStr) {
    //   return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    // },
    // content(findStr) {
    //   return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },

  }

}
</script>

<style lang="scss" scoped></style>

