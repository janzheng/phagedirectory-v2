
<!-- 

  This is MailChimp.vue duplicated w/ launch banner info

  — longer content than the footer version, used to place over Capsid and other pages

 -->
<template>

  <!-- side-by-side -->
  <!-- <div class="CapsidBanner "> -->
  <div class="_card _padding ">
    <div class="" v-html="$md.render(banner || '')" />
    <div id="mc_embed_signup">
      <form id="mc-embedded-subscribe-form"
            action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"
            method="post" name="mc-embedded-subscribe-form" class="validate" target="_blank">
        <div id="mc_embed_signup_scroll">
          <div id="mce-responses" class="clear hhoney">
            <div id="mce-error-response" style="display:none" class="response" />
            <div id="mce-success-response" style="display:none" class="response" />
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
          <div class="mc-field-group _flex-row _flex-wrap">
            <input id="mce-EMAIL" :placeholder="placeholder" type="email" name="EMAIL" class="_flex-2 required email _form-input _radius --phage --short _margin-right-none-xs _margin-bottom-xs" required>
            <input id="mc-embedded-subscribe" class=" _button _font-bold --outline _v-top _margin-bottom-none --short _width-full-xs" type="submit" value="Get Capsid &amp; Tail" name="subscribe" >
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- side-by-side -->
  <!-- <div class="CapsidBanner _grid-3-2 _align-vertically">
    <div class="" v-html="$md.render(banner || '')" />
    <div id="mc_embed_signup">
      <form id="mc-embedded-subscribe-form"
            action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca"
            method="post" name="mc-embedded-subscribe-form" class="validate" target="_blank">
        <div id="mc_embed_signup_scroll">
          <div id="mce-responses" class="clear hhoney">
            <div id="mce-error-response" style="display:none" class="response" />
            <div id="mce-success-response" style="display:none" class="response" />
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
          <div class="mc-field-group">
            <input id="textInput" class="_form-input --button" type="email" name="textInput" placeholder='Email Address' />
            <button class="_button _margin-none">Sign Up</button>

            <input id="mce-EMAIL" :placeholder="placeholder" type="email" name="EMAIL" class="required email _form-input _radius --phage  --inline _margin-right-half" required>
            <input id="mc-embedded-subscribe" class=" _button _font-bold --outline _v-top _margin-bottom-none --inline _margin-top-half" type="submit" value="Get Capsid &amp; Tail" name="subscribe" >
          </div>
        </div>
      </form>
    </div>
  </div> -->

</template>


<script>


export default {

  components: {
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // banner: this.$cytosis.find('Content.capsid-microbanner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      banner: this.$cytosis.find('Content.capsid-microbanner', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
      placeholder: this.$cytosis.find('Content.capsid-placeholder', {'Content': this.$store.state['Content']})[0]['fields']['Markdown'],
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

