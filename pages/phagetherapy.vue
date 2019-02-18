<template>

  <div class="Therapy _section-page _margin-center">

    <div class="_section-content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(intro)" />

      <div class="_section-article _margin-center">
        <div class="_padding-bottom" v-html="$md.render(content)" />

        <div>
          <FormTherapy id="form" class=""/>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

// import { mapState } from 'vuex'
import FormTherapy from '~/forms/FormTherapy.vue'

export default {
  head () {
    const title = "Phage Therapy"

    return {
      title,
    }
  },

  components: {
    FormTherapy,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_therapy"
  },
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  // async asyncData({app, store}) {
  //   // const cytosis = store.state.cytosis.tables
    
  //   // if(!store.state.cytosis.tables)
  //   //   return false

  //   return {
  //     // intro: app.$cytosis.find('Content.therapy-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
  //     // content: app.$cytosis.find('Content.therapy-content', {'Content': this.$store.state['Content']})[0]['fields']['Markdown']
  //   }
  // },

  data: function () {
    // console.log('data:', this.$store.state['Content'])
    return {
      intro: this.$cytosis.find('Content.therapy-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.therapy-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown']
    }
  },

  computed: {
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

