<template>

  <section class="Alerts narrow copy _margin-center _padding-top-2">

    <div class=" Alerts-intro _margin-bottom-2 ">
      <div class="_padding-bottom" v-html="$md.render(intro)" />
      <AlertSignup class="Article _margin-center --banner _margin-top _margin-bottom" />
    </div>

    <div class="Article Alerts-list _margin-center">
      <div v-for="alert of Alerts" v-if="alert.fields.isPublished" :key="alert.fields.Name" :class="alert.fields.Status" class="Alerts-item _card _padding" >
        <div class="Alerts-status" >
          <div class="_grid-auto-1-xs _align-vertically">
            <span :class="alert.fields.Status" class="Alerts-status-tag" >{{ alert.fields.Status }}</span>
            <span class="_right">{{ alert.fields.Date | niceDate }}</span>
          </div>
        </div>
        <div class="Alerts-title" v-html="$md.render(alert.fields.Name)" />
        <div class="Alerts-tags">
          <span v-for="tag of alert.fields.Tags" :key="tag" class="Alerts-tag _tag" >
            {{ tag }}
          </span>
        </div>
        <div class="Alerts-content" v-html="$md.render(alert.fields.Markdown || '')" />
      </div>
    </div>


  </section>

</template>

<script>

import AlertSignup from '~/components/AlertSignup.vue'
import { mapState } from 'vuex'

export default {
  head () {
    const title = "Phage Alerts"

    return {
      title,
    }
  },

  components: {
    AlertSignup
  },
  
  layout: 'contentframe',
  middleware: 'pageload',

  // async asyncData({env, route, store}) {
  //   return {
  //   }
  // },

  data: function () {
    return {
      intro: this.$cytosis.find('Content.alerts-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug: this.$route.params.slug,
      // alert: undefined, // loaded in 'mounted'
    }
  },

  computed: {
    ...mapState([
      'Alerts',
      'Content',
      ]),
  },

  mounted: async function () {
    // const slug = unescape(this.$route.params.slug)
    // const alert = this.cytosis.find(slug, [this.Alerts], ['Slug'])[0]
    // if (alert && alert.fields.isPublished)
    //   this.alert = alert
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

