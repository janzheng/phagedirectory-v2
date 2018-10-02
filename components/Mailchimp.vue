
<!-- 

  This is your standard vanilla footer signup; create a separate one for one-time promos

 -->
<template>

  <div class="Mailchimp MailchimpBanner _grid-3-2 _width-content-paragraph _align-vertically">

    <div class="_md-p_fix" v-html="$md.render(intro || '')">
    </div>

    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup">
      <!-- use this on the form for the regular mailchimp page
        action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"  -->
      <!-- use this for a custom thing: @submit.prevent="handleSubmit" -->
      <form 
        action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"
        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
          <!-- <div class="" v-html="$md.render(intro || '')"></div> -->
          <div id="mce-responses" class="clear hhoney">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
          <div class="mc-field-group _flex-row">
            <input type="email" :placeholder="placeholder" name="EMAIL" class="_flex-1 required email _form-input _radius --phage  --width-full-xs _margin-right-half" id="mce-EMAIL">
            <input class=" _button --phage --outline _v-top _margin-bottom-none" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe">
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
      intro: this.$cytosis.find('Content.mailchimp-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      placeholder: this.$cytosis.find('Content.mailchimp-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      banner: this.$cytosis.find('Content.mailchimp-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  mounted: async function () {
  },

  computed: {
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

