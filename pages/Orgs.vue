<template>

  <article class="Orgs container">
    <Header/>

    <section class="narrow copy">

      <h1 class="Orgs-title title">
        Organizations
      </h1>

      <div v-html="$md.render(getContent('Orgs-Intro'))"></div>

    </section>

    <section class="max copy">
      <div class="_card-container _grid-2 _margin-top _margin-bottom">
        <div class="_card" v-for="org in orgs" v-if="org.fields.isPublished" :key="org.id">

          <router-link :to="{ path: `orgs/${org.fields.slug}`}">

            <div class="_card-upper">
              <div class="_card-image-container" v-if="org.fields.Image">
                <img class="_card-image" :src="org.fields.Image[0].thumbnails.large.url"
                />
              </div>
            </div>
            <div class="_card-lower">
              <div class="_card-title">{{org.fields.Name}}</div>
              <div class="_card-description">{{org.fields.ShortDescription}}</div>
            </div>
          </router-link>

        </div>
      </div>
    </section>

    <section class="narrow copy">
      <Message/>
    </section>

    <Footer/>
  </article>

</template>

<script>

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Message from '~/components/Message.vue'

import {fetchCytosis, getCytosis} from '~/assets/helpers.js'



export default {

  components: {
    Header,
    Footer,
    Message
  },

  // data () {
  //   console.log("Welcome to BuildATL", this.$route, this.$route.params)
  //   return { params: this.$route.params }
  // },


  data: function () {
    return {
      content: this.$store.state.Content,
      orgs: this.$store.state.Organizations
    }
  },

  async fetch({ store, params }) {
    return fetchCytosis(store, params)
  },

  mounted: function () {
    const _this = this
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      // console.log('Data Loaded: ', _this)
    })
  },

  methods: {
    getContent: function(findStr) {
      let obj = ''
      if(this.content) {
        obj = getCytosis().find(findStr, [this.content])[0]['fields']['Markdown']
        // console.log('obj', obj)
      }
      return obj
    },
  },

}
</script>

<style lang="scss" scoped>

.logo-sm {
  width: 80px;
  height: 100%;
  vertical-align: middle;
  padding-bottom: 6px;
}

</style>

