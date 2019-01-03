
<!-- 

  This is MailChimp.vue duplicated w/ launch banner info

  — longer content than the footer version, used to place over Capsid and other pages

 -->
<template>

  <div class="Mailchimp Capsid CapsidBanner _grid-3-2 _align-vertically _width-content-paragraph">

    <div class="" v-html="$md.render(banner || '')">
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
          <div id="mce-responses" class="clear hhoney">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
          <div class="mc-field-group">
            <input type="email" :placeholder="placeholder" name="EMAIL" class="required email _form-input _radius --phage  --width-full _margin-right-half" id="mce-EMAIL">
            <input class=" _button _font-bold --outline _v-top _margin-bottom-none --width-full _margin-top-half" type="submit" value="Get Capsid &amp; Tail" name="subscribe" id="mc-embedded-subscribe">
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
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      banner: this.$cytosis.find('Content.capsid-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
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

