<template>

  <div class="Alerts Section-Page _margin-center">

    <div class="Section-Content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(intro)" />
    </div>

    <div class="Section-Content _margin-center">
      <SignupAlert class="Section-Article _margin-center" />
    </div>

    <div class="Alerts-container Section-Content _margin-center">
      <div v-for="alert of Alerts" v-if="alert.fields.isPublished" :key="alert.fields.Name" :class="alert.fields.Status" class="Alerts-item Section-Article _margin-center _card _padding-2" >
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
        <div class="Alerts-content " v-html="$md.render(alert.fields.Markdown || '')" />
      </div>
    </div>

  </div>

</template>

<script>

import SignupAlert from '~/components/SignupAlert.vue'
import { mapState } from 'vuex'

export default {
  head () {
    const title = "Phage Alerts"

    return {
      title,
    }
  },

  components: {
    SignupAlert
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

