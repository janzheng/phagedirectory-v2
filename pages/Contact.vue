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
  
  // async asyncData({app, env, route, store}) {
  async asyncData({app, store}) {
    // const cytosis = store.state.cytosis
    return {
      content: app.$cytosis.find('Content.about-contact', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

}
</script>

<style lang="scss" scoped>
</style>

