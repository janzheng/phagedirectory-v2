
<template>

  <div class="AlertSignup" :class="classes">
    <form 
      class="AlertSignup-form" 
      action="https://tinyletter.com/phagedirectory" 
      method="post" target="popupwindow" 
      onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
    >
      <p v-if="description" >
        Alerts are sent when phages are needed to help treat someone’s infection.
      </p>
      <div>
        <label for="tlemail" class=" _v-middle _inline-block _margin-right-half"> 
          <span class="AlertSignup-sub" >Subscribe to phage alerts:</span>
          <!-- <div  class="AlertSignup-note _font-small ">No spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
        </label> 
        <input type="text" name="email" id="tlemail" 
               class="_form-input --short --phage _inline --width-full-xs _margin-right"
               placeholder="email@address.com" required/>
        <input type="hidden" value="1" name="embed"/>
        <input class="AlertSignup-cta _inline _button --phage --outline --short" type="submit" value="Subscribe" />
      </div>
      <div class="AlertSignup-note _font-small _font-normal _padding-top-half">We only send alerts when we receive urgent phage requests. <a href="/policies#alerts">Please review our policies.</a></div>
      <!-- <div class="alerts-note _right _font-small _padding-top-half">Only to be used for phage requests, not spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
    </form>
  </div>

</template>


<script>

import { cytosis } from '~/assets/helpers.js'

export default {
  props: ['classes', 'description'],

  components: {
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
  },


  methods: {
  }

}
</script>

