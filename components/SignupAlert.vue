
<!-- 

  Signup for Alerts for footer and alerts page

 -->
<template>

  <div class="Signup Signup-Alert _card --shadow _margin-none" >
    <form 
      class="Signup-form _height-100 _flex-col" 
      action="https://tinyletter.com/phagedirectory" 
      method="post" target="popupwindow" 
      onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
    >
      <div class="_flex-2">
        <label for="tlemail" class=" _v-middle _margin-right-half">
          <div class="Signup-sub _md-p_fix" v-html="$md.render(intro || '')">Receive our Phage Alerts</div>
        </label> 

        <div class="" v-html="$md.render(content || '')" />
      </div>

      <div class="Signup-content _flex-row _flex-wrap">
        <label for="tlemail">Email Address</label>
        <input id="tlemail" name="email" type="email" 
               class="Signup-input _flex-1 _form-input --width-full _margin-none"
               placeholder="Your email" required>
        <input type="hidden" value="1" name="embed" >
        <input class="Subscribe _flex-1 Signup-cta --width-full _button --outline _margin-top-half " type="submit" value="Receive Phage Alerts" >
      </div>

      <!-- <div class="Signup-note _font-small _padding-top-half">Alerts are only sent when phages are requested to treat urgent infections. <a class="--nowrap" href="/policies#alerts">Please review our policies.</a></div> -->
    </form>
  </div>

</template>


<script>

export default {

  data: function () {
    return {
      intro: this.$cytosis.find('Content.alertssignup-intro', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.alertssignup-content', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

