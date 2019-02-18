<template>

  <div class="Alerts _section-page _margin-center">

    <div class="_section-content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(intro || '')" />
    </div>

    <div class="_section-content _margin-center">
      <SignupAlert class="_section-article _margin-center" />
    </div>

    <div class="Alerts-container _section-content _margin-center">
      <div v-for="alert of Alerts" v-if="alert.fields.isPublished" :key="alert.fields.Name" :class="alert.fields.Status" class="Alerts-item _section-article _margin-center _card _padding-2" >
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
  meta: {
    tableQuery: "_alerts"
  },

  // async asyncData({env, route, store}) {
  //   return {
  //   }
  // },

  data: function () {
    // console.log('Alerts data:', this.$store.state['Content'])
    return {
      intro: this.$cytosis.find('Content.alerts-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      slug: this.$route.params.slug,
      // alert: undefined, // loaded in 'mounted'
    }
  },

  computed: {
    ...mapState([
      'Alerts',
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

