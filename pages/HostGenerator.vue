<template>

  <article class="NameGenerator container">
    <Header/>

    <section class="narrow copy">

    <h1 class="Orgs-title title">
      Host Generator
    </h1>

    This is an internal tool, but anyone is welcome to use it.


    Note to self: 
    
    airtable doesn't do table joining, so this code is in lieu of that.
    It combines the tables genus (Escherichia) and its species (coli) and generates all combinations like (Escherichia coli)

    Currently it does NOT write to DB, so you have to do that part manually. Don't overwrite current DB values as it'll most like remove current links from Orgs etc.

    <div>
      <ul>
        <li v-for="host of joinGenus" :key="host">
          {{host}}
        </li>
      </ul>
    </div>

    <hr/>

    </section>
    <Footer/>
  </article>

</template>

<script>

import Cytosis from 'cytosis'

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

  data: function () {
    return {
      family: this.$store.state.HostFamily,
      genus: this.$store.state.HostGenus,
      species: this.$store.state.HostSpecies,
    }
  },

  async asyncData({ app, store, params }) {
    let cytosis = await fetchCytosis(store, params)
    // return {
    //   cytosis: cytosis
    // }
  },

  mounted: function () {
    const _this = this
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      console.log('Data Loaded: ', _this.cytosis)
    })
  },


  methods: {
    getContent: function(findStr) {
      let obj = ''
      if(this.content) {
        // obj = getCytosis().find(findStr, [this.content])[0]['fields']['Markdown']
      }
      return obj
    },
  },

  computed: {
    joinGenus () {
      let result = []
      for (let gen of this.genus ) {
        console.log(' ehh : ' , gen.fields['HostSpecies'], this.species)
        let species = getCytosis().getLinkedRecords(gen.fields['HostSpecies'], this.species, true)
        for (let spe of species ) {
          result.push(`${gen.fields.Name} ${spe.fields.Name}`)
        }
      }
      return result
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

