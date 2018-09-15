<template>

  <ContentFrame class="Alerts">
    <section class="narrow copy _margin-center">

      <div class="Alerts-intro _margin-bottom-2">
        <div class="" v-html="$md.render(intro)"></div>
        <AlertSignup classes="_font-bold" />
      </div>

      <div class="Alerts-list">
        <div class="Alerts-item _card _padding" v-for="alert of Alerts" :key="alert.fields.Name" v-if="alert.fields.isPublished" :class="alert.fields.Status">
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
import { mapState } from 'vuex'
import Cytosis from '~/other/cytosis'

export default {

  components: {
    ContentFrame,
    AlertSignup
  },
  
  middleware: 'pageload',

  async asyncData({env, route, store}) {
    let cytosis
    if(!store.state.Content) {
      cytosis = await store.dispatch('loadCytosis', {
        env,
        tableIndex: 'static',
      })
    } else {
      cytosis = store.state.cytosis
    }

    return {
      cytosis,
      intro: Cytosis.find('Content.alerts-intro', cytosis.tables)[0]['fields']['Markdown']
    }
  },

  data: function () {
    return {
      slug: this.$route.params.slug,
      // alert: undefined, // loaded in 'mounted'
    }
  },

  mounted: async function () {
    // const slug = unescape(this.$route.params.slug)
    // const alert = this.cytosis.find(slug, [this.Alerts], ['Slug'])[0]
    // if (alert && alert.fields.isPublished)
    //   this.alert = alert
  },

  computed: {
    ...mapState([
      'Alerts',
      'Content',
      ]),
  },


  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

