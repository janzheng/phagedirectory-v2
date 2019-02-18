<template>
  <div class="VomJoin Research">
    <Form :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          :errorMsg="error"
          :postUrl="postUrl"
          :isAlert="true"
          :isJson="true"
          
          table="Dynamic"
          notes="FormVomResearch submission"
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
    return {
      postUrl: this.$store.state.ext_handler,

      intro: this.$cytosis.find('Content.join-research-form', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      source: this.$cytosis.find('Content.join-research-form', {'Content': this.$store.state['Content']} )[0]['fields']['JSON'],
      isPublished: this.$cytosis.find('Content.join-research-form', {'Content': this.$store.state['Content']} )[0]['fields']['isPublished'],
      
      error: this.$cytosis.find('Content.error-form', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      thanks: this.$cytosis.find('Content.join-form-thanks', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      cta: this.$cytosis.find('Content.join-cta', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      privacy: this.$cytosis.find('Content.privacy-forms', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped></style>

