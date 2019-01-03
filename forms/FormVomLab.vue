<template>
  <div class="VomJoin Lab">
    <Form :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          :errorMsg="error"
          :postUrl="postUrl"
          :alert="true"
          :json="true"
          class=""
          notes="FormVomLab submission"
          table="Dynamic"
    />
  </div>
</template>

<script>

import Form from '~/components/Form.vue'

export default {

  // props: ['postUrl', 'intro', 'source', 'cta', 'thanks', 'privacy'],
  components: {
    Form,
  },

  data: function () {
    const cytosis = this.$store.state.cytosis
    return {
      postUrl: this.$store.state.ext_handler,
      cytosis,

      intro: this.$cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['Markdown'],
      source: this.$cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['JSON'],
      isPublished: this.$cytosis.find('Content.join-lab-form', cytosis.tables)[0]['fields']['isPublished'],
      
      error: this.$cytosis.find('Content.error-form', cytosis.tables)[0]['fields']['Markdown'],
      thanks: this.$cytosis.find('Content.join-form-thanks', cytosis.tables)[0]['fields']['Markdown'],
      cta: this.$cytosis.find('Content.join-cta', cytosis.tables)[0]['fields']['Markdown'],
      privacy: this.$cytosis.find('Content.privacy-forms', cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped></style>

