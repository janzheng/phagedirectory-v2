
<template>

  <div class="AlertSignup" :class="classes">
    <form 
      class="AlertSignup-form _height-100" 
      action="https://tinyletter.com/phagedirectory" 
      method="post" target="popupwindow" 
      onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
    >
      <div >
        <label for="tlemail" class=" _v-middle _margin-right-half"> 
          <div class="AlertSignup-sub" >Subscribe to phage alerts:</div>
          <!-- <div  class="AlertSignup-note _font-small ">No spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
        </label> 
        <div class="_flex-row _width-content-input">
          <input type="text" name="email" id="tlemail" 
                 class="_flex-1 _form-input --short --phage --width-full-xs _margin-right-half"
                 placeholder="Your email" required/>
          <input type="hidden" value="1" name="embed"/>
          <input class="AlertSignup-cta _button --phage --outline --short" type="submit" value="Subscribe" />
        </div>
      </div>
      <div class="AlertSignup-note _font-small _padding-top-half">Alerts are only sent when phages are requested to treat urgent infections. <a class="--nowrap" href="/policies#alerts">Please review our policies.</a></div>
      <!-- <div class="alerts-note _right _font-small _padding-top-half">Only to be used for phage requests, not spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
    </form>
  </div>

</template>


<script>

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

