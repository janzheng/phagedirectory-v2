<template>
  <div class="FormContact FormCard">

    <Form :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          :errorMsg="error"
          :postUrl="postUrl"
          :alert="true"
          class=""
          table="Dynamic"
    />
  </div>
</template>

<script>

import Form from '~/components/Form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
  },

  data: function () {
    const cytosis = this.$store.state.cytosis
    
    return {
      postUrl: this.$store.state.ext_handler,
      intro: this.$cytosis.find('Content.contact-form', cytosis.tables)[0]['fields']['Markdown'],
      source: this.$cytosis.find('Content.contact-form', cytosis.tables)[0]['fields']['JSON'],
      isPublished: this.$cytosis.find('Content.contact-form', cytosis.tables)[0]['fields']['isPublished'],
      
      error: this.$cytosis.find('Content.error-form', cytosis.tables)[0]['fields']['Markdown'],
      thanks: this.$cytosis.find('Content.contact-thanks', cytosis.tables)[0]['fields']['Markdown'],
      cta: this.$cytosis.find('Content.contact-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: this.$cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

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

