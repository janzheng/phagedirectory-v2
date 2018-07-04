<template>

  <ContentFrame class="Alerts">
    <section class="narrow copy">

      <div class="Alerts-intro _margin-bottom-2">
        <div class="" v-html="content('Content.alerts-intro')"></div>
        <AlertSignup classes="_font-bold" />
      </div>

      <div class="Alerts-list">
        <div class="Alerts-item _card" v-for="alert of Alerts" :key="alert.fields.Name" v-if="alert.fields.isPublished" :class="alert.fields.Status">
          <div class="Alerts-status" >
            <div class="_grid-auto-1-xs _align-vertically">
              <span class="Alerts-status-tag" :class="alert.fields.Status">{{alert.fields.Status}}</span>
              <span class="_right">{{alert.fields.Date}}</span>
            </div>
          </div>
          <div class="Alerts-title" v-html="$md.render(alert.fields.Name)"></div>
          <div class="Alerts-tags">
            <span class="Alerts-tag _tag" v-for="tag of alert.fields.Tags" :key="tag">
              {{tag}}
            </span>
          </div>
          <div class="Alerts-content" v-html="$md.render(alert.fields.Markdown || '')">
          </div>
        </div>
      </div>


    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import AlertSignup from '~/components/AlertSignup.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame,
    AlertSignup
  },
  
  middleware: 'pageload',

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      slug: this.$route.params.slug,
      alert: undefined, // loaded in 'mounted'
    }
  },

  mounted: async function () {
    const slug = unescape(this.$route.params.slug)
    const alert = this.cytosis.find(slug, [this.Alerts], ['Slug'])[0]
    if (alert && alert.fields.isPublished)
      this.alert = alert
  },

  computed: {
  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] ?  this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

