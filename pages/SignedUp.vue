
<!-- 

  This is used as the Mailchimp Thanks page

 -->
<template>

  <section class="SignedUp container narrow copy _margin-center">
    <div v-html="$md.render(signedup || '')"></div>
  </section>
</template>

<script>

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',

  created: function () {
  },

  data: function () {
    return {
      signedup: this.$cytosis.find('Content.mailchimp-signedup', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

