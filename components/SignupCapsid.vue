
<!-- 

  Capsid & Tail Signup Card for footer

 -->
<template>

  <!-- <div class="Mailchimp Capsid CapsidBanner _grid-2-1 _width-content-paragraph _align-top"> -->
  <div class="Signup Signup-Capsid _card --shadow _width-content-paragraph ">


    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup" class="_height-100">
      <!-- use this on the form for the regular mailchimp page
        action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"  -->
      <!-- use this for a custom thing: @submit.prevent="handleSubmit" -->
      <form id="mc-embedded-subscribe-form"
            action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"
            method="post" name="mc-embedded-subscribe-form" class="Signup-form _flex-col _height-100 validate" target="_blank">

        <div class="_flex-2" v-html="$md.render(intro || '')" />

        <div id="mc_embed_signup_scroll " class="">
          <!-- <div class="" v-html="$md.render(intro || '')"></div> -->
          <div id="mce-responses" class="clear hhoney">
            <div id="mce-error-response" style="display:none" class="response" />
            <div id="mce-success-response" style="display:none" class="response" />
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
          <div class="mc-field-group">
            <label for="mce-EMAIL">Email Address</label>

            <input id="tlemail" name="email" type="email" 
                   class="Signup-input _flex-1 _form-input --width-full _margin-none"
                   placeholder="Your email" required>
            <!-- <input id="mce-EMAIL" :placeholder="placeholder" type="email" name="EMAIL" class="_width-full _block required email _form-input _radius --width-full _margin-right-half" required> -->
            <input id="mc-embedded-subscribe" class="Subscribe _margin-top-half _width-full _block _button --outline _v-top _margin-bottom-none" type="submit" value="Get Capsid & Tail" name="subscribe" >
          </div>
        </div>
      </form>
    </div>

  </div>
  <!-- End Mailchimp -->
</template>


<script>


export default {

  components: {
  },

  data: function () {
    return {
      intro: this.$cytosis.find('Content.capsid-footer', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
      placeholder: this.$cytosis.find('Content.capsid-placeholder', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
      banner: this.$cytosis.find('Content.capsid-banner', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
    }
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

