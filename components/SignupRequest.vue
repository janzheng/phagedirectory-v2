
<template>

  <div :class="classes" class="Signup _card --tertiary-80 _margin-none">
    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup">
      <form id="mc-embedded-subscribe-form"
            class="Signup-form _height-100 validate"
            action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=95f1c1372a"
            method="post"
            name="mc-embedded-subscribe-form"
            target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">

          <label for="rq-EMAIL" class=" _v-middle _margin-right-half"> 
            <div class="Signup-sub _md-p_fix" v-html="$md.render(intro || '')">Receive our Phage Requests</div>
          </label> 

          <div class="" v-html="$md.render(content || '')" />
          <div class="mc-field-group _margin-bottom">
            <label for="rq-EMAIL">Email Address</label>
            <input id="rq-EMAIL"
                   type="email" value="" name="EMAIL" 
                   class="Signup-input _flex-1 _form-input --short --width-full _margin-none"  
                   placeholder="Your email" required>
          </div>
          <div class="mc-field-group">
            <label for="rq-ORG">Organization, Lab, or University</label>

            <input id="rq-ORG" 
                   type="text" value="" name="ORG" 
                   class="Signup-input _flex-1 _form-input --short --width-full _margin-none"  
                   placeholder="SDSU Roach Lab" required>
          </div>
          <div id="mce-responses" class="clear">
            <div id="mce-error-response" class="response" style="display:none" />
            <div id="mce-success-response" class="response" style="display:none" />
          </div>

          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_95f1c1372a" tabindex="-1" value=""></div>
          <div class="clear">
            <input id="mc-embedded-subscribe" class="Subscribe _flex-1 Signup-cta _button --outline --width-full _margin-top-half " type="submit" value="Join Phage Requests" name="subscribe" >
          </div>
        </div>
      </form>
    </div>
    <!--End mc_embed_signup-->
  </div>

</template>


<script>

export default {
  components: {
  },

  props: {
    classes: String,
    description: String
  },

  data: function () {
    return {
      intro: this.$cytosis.find('Content.requestssignup-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.requestssignup-content', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

