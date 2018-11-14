
<template>
<!-- <template> -->
<ContentFrame class="Home">

<a href="http://phage-futures.com/test" target="_blank" >Link out test</a>

## Lang render {{ banana }}

{{banana}} [._color-phdir]

## Gabba [._color-red] {._color-red}

<div> hey hey!! </div>


<div v-html="$md.render(mdd)" v-if="$md">
</div>

</ContentFrame>
</template>




<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Twitter from '~/components/Twitter.vue'
import FormVomFeedback from '~/forms/FormVomFeedback.vue'

import { mapState } from 'vuex'
// import Cytosis from 'cytosis'
import Cytosis from '~/other/cytosis'
// console.log('woop', Cytosis.find)

// import {fetchCytosis, getCytosis} from '~/assets/helpers.js'
// import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame,
  },

  middleware: ['pageload'],
  
  async asyncData({env, route, store}) {
  },

  data: function () {
    // console.log('md:',this.$md)
    // console.log('data cyt:', this.$store.state.cytosis) 
    return {
      banana: "I am a BANANA"
      // cytosis: this.$store.state.cytosis,
    }
  },
  
  mounted: function () {
  },

  computed: {
    ...mapState([
      'Content',
      ]),
    mdd() {
      return `
# Injected

what the hell? [._color-green] {._color-red}

[hey](google.com)

https://google.com

{{ banana }}

that's google! [._font-large] {._font-large}

one two <br/> three four

<div>
  injected html: hey hey!!
</div>

<span>this is a span!?</span>

blah
`
    }
  },

  methods: {
  },


}
</script>

<style>
</style>


