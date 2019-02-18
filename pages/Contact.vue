<template>
  
  <div class="Contact _section-page _margin-center">
    <div class="_section-content _margin-center">
      <div class="_section-article" v-html="$md.render(content || '')" />
    </div>
    <div class="_section-content _margin-center">
      <div class="_section-article">
        <FormContact />
      </div>
    </div>
  </div>
</template>

<script>

import FormContact from '~/forms/FormContact.vue'

export default {
  head () {
    const title = "Contact Us"

    return {
      title,
    }
  },

  components: {
    FormContact
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_contact"
  },
  
  data: function () {
    return {
      // aboutTitle: this.$cytosis.find('Content.about-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.about-contact', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

}
</script>

<style lang="scss" scoped>
</style>

