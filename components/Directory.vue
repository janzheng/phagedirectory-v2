
<template>

  <section class="Directory" >
    <!-- src: {{ searchSource }} / {{ search }} -->
    <!-- Directory search: {{search}} / view: {{view}} -->

    <!-- <section class="Directory-intro narrow"> -->
    <section v-if="!search" class="Directory-intro narrow --left" >
      <!-- <h1 class="Directory-name">Phage Directory</h1> -->
      <h1 class="Directory-name">{{ viewName }} Directory</h1>
      <div v-if="view == 'phages'" class="Directory-desc block" v-html="$md.render(phagesText)" />
      <div v-if="view == 'labs'" class="Directory-desc block" v-html="$md.render(labText)" />
      <!-- <h4 class="Directory-name" v-if="fromSearch">{{viewName}} Directory</h4> -->
      <!-- <h6 class="Directory-name">Phage Directory</h6> -->
      <!-- The following individuals and organizations work with phages of bacterial hosts of the phages.

      Their emails are hidden for privacy reasons. If you need to contact them, please email your request [staff@phage.directory](staff@phage.directory) or tweet us and the researcher of interest.

      Join the fight, [join the list](/join). -->
    </section>
    <!-- </section> -->

    <div class="Directory-list">
      <div class="Directory-nav-container">
        <div class="Directory-nav _grid-auto-1">
          <div>
            <router-link :class="{'--active': view == 'phages'}" to="/phages" class="Directory-btn _button --short --outline _margin-right _margin-bottom-none">Phage Hosts</router-link>
            <router-link to="/labs" class="Directory-btn _button Btn-outline --short --outline _margin-right _margin-bottom-none">Labs</router-link>
          </div>
          <input id="searchbar" ref="pageSearch" v-model.trim="search" class="Directory-search _form-input --width-full --short _inline" type="text" name="searchbar" placeholder="Search" >
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

import { mapState } from 'vuex'
import DirectoryView from '~/components/DirectoryView.vue'

export default {

  components: {
    DirectoryView
  },

  data: function () {
    return {
      phagesText: this.$cytosis.find('Content.directory-phages', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      labText: this.$cytosis.find('Content.directory-labs', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'searchSource',
      // 'test'
      ]),

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
        // return this.$store.state.test
        return this.$store.state.searchString
      },
      // setter
      set: function (str) {
        const url = `/search/${this.search}`
        this.$store.dispatch('update', {
          searchSource: 'page',
          searchUrl: url
        })

        this.$store.dispatch('update', {searchString: str})
      }
    }
  },

  mounted: async function () {
    // console.log('mounted')
    this.setFocus()
  },
  
  updated: async function () {
    this.setFocus()
  },


  methods: {
    setFocus() {
      this.$nextTick(() => {
        // this.$refs.search.focus()
        if(this.$refs.search) { // might unfocus and unmount the component before tick
          this.$refs.search.focus()
        }
      }) // required bc dispatch updates this component

    }
  }

}
</script>


