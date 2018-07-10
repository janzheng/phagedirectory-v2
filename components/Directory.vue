
<template>

  <section class="Directory" :class="classes" >
    <!-- Directory search: {{search}} / view: {{view}} -->

    <!-- <section class="Directory-intro narrow"> -->
    <div class="Directory-intro" v-if="!search">
      <!-- <h1 class="Directory-name">Phage Directory</h1> -->
      <h1 class="Directory-name">{{viewName}} Directory</h1>
      <!-- <h4 class="Directory-name" v-if="fromSearch">{{viewName}} Directory</h4> -->
      <!-- <h6 class="Directory-name">Phage Directory</h6> -->
      <div class="Directory-desc block" v-html="content('directory-phages')" v-if="view == 'phages'"></div>
      <div class="Directory-desc block" v-html="content('directory-labs')" v-if="view == 'labs'"></div>
      <!-- The following individuals and organizations work with phages of bacterial hosts of the phages.

      Their emails are hidden for privacy reasons. If you need to contact them, please email your request [staff@phage.directory](staff@phage.directory) or tweet us and the researcher of interest.

      Join the fight, [join the list](/join). -->
    </div>
    <!-- </section> -->


    <div class="Directory-list">
      <div class="Directory-nav-container">
        <div class="Directory-nav _grid-auto-1">
          <div>
            <router-link to="/phages" class="Directory-btn _button --short --outline _margin-right _margin-bottom-none" :class="{'--active': view == 'phages'}">Phages</router-link>
            <router-link to="/labs" class="Directory-btn _button Btn-outline --short --outline _margin-right _margin-bottom-none">Labs</router-link>
          </div>
          <input v-model.trim="search" class="Directory-search _form-input --width-full --short _inline" type="text" name="searchbar" id="searchbar" placeholder="Search" ref="search" />
        </div>
      </div>

      <DirectoryView :search="search" :view="view" />

<!-- 
      <div class="DirectoryView phages" v-if="view == 'phages' ">
        <h4 class="DirectoryView-title">{{ view }}</h4>

        <div class="DirectoryView-list">
          <div class="DirectoryView-head phage">
            <div class="DirectoryView-title">Escherichia coli</div>
            <div class="DirectoryView-main-info">
              Additional info here
            </div>
          </div>

          <div class="DirectoryView-body">
            <div class="DirectoryView-items">
              <div class="DirectoryView-item">
                Org Name {
                  Lab name / PI / # phages
                } 
              </div>
            </div>
          </div>
        </div>
      </div>
 -->
 <!-- 
      <div class="DirectoryView" v-if="view == 'labs' ">
        <h2 class="Directory-view">{{ view }}</h2>
        Directory search: {{search}} / view: {{view}}
        LABS VIEW
      </div>
 -->
    </div>


  </section>

</template>


<script>

import { cytosis } from '~/assets/helpers.js'
import DirectoryView from '~/components/DirectoryView.vue'

export default {
  props: ['fromSearch'],

  components: {
    DirectoryView
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      classes: '',
      test: undefined
    }
  },

  mounted: async function () {
  },
  updated: async function () {
  },

  computed: {
    view() {
      if(this.$route.name == 'phages' || this.$route.name == 'labs')
        return this.$route.name
      else
        return 'phages'
    },
    viewName() {
      if(this.$route.name == 'phages')
        return 'Phage'

      if(this.$route.name == 'labs')
        return 'Lab'

      return 'Phage'
    },
    search: {
      get: function () {
        // return this.test
        return this.$store.state.search.string
      },
      // setter
      set: function (str) {
        const url = `/search/${this.search}`
        this.test = str
        this.$store.dispatch('update', {
          search: {
            string: str,
            url: url
          }
        })
        this.$nextTick(() => {
          if(this.$refs.search) // might unfocus and unmount the component before tick
            this.$refs.search.focus()
        }) // required bc dispatch updates this component

      }
    }
  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] ?  this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
  }

}
</script>


