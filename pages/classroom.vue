
<template>

  <div class="Classroom _section-page _margin-center">
    <div class="_section-content _margin-center">

      <div class="_section-article _margin-center _flex-row _flex-vertically">
        <div>
          <img class="_flex-auto _v-bottom _margin-right _padding-bottom" src="/classroom.png" title="Phage Directory Classroom" width="55">
        </div>
        <div class="_flex-auto _v-bottom">
          <div>Phage Directory</div>
          <h1 class="_padding-top-0">Classroom Initiative</h1>
        </div>
      </div>

      <div class="_section-article _margin-center">
        <div class="Classroom-bg">
          <div class="" v-html="$md.render(classroomBg || '')" />
        </div>


        <div id="pledge" class="Classroom-form FormCard --tertiary-10" >
          <div class="" v-html="$md.render(classroomForm || '')" />
          <form id="mc-embedded-subscribe-form"
                action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=f7c4e1695f"
                method="post" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll ">
              <!-- <div class="" v-html="$md.render(intro || '')"></div> -->
              <div id="mce-responses" class="clear hhoney">
                <div id="mce-error-response" class="response" style="display:none" />
                <div id="mce-success-response" class="response" style="display:none" />
              </div>
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="b_a95319e0a6f57b754b11012a8_f7c4e1695f" tabindex="-1" value="">
              </div>
              <div class="mc-field-group ">
                <div class="_form-control">
                  <label for="mce-NAME" class="_form-label _font-bold">Name </label>
                  <input id="mce-NAME" placeholder="Your name" type="text" value="" name="NAME" class="_width-full _block required email _form-input _radius --phage  --width-full _margin-right-half" >
                </div>

                <div class="_form-control">
                  <label for="ex1-name" class="_form-label _font-bold">Email</label>
                  <input id="mce-EMAIL" placeholder="Your email" type="email" name="EMAIL" class="_width-full _block required email _form-input _radius --phage  --width-full _margin-right-half" >
                </div>

                <div class="">
                  <input id="mc-embedded-subscribe" class="CTA _button Subscribe _margin-top-half _width-full _block _button --outline _v-top _margin-bottom-none _font-bold" type="submit" value="Take the Pledge!" name="subscribe" >
                </div>
              </div>
            </div>
          </form>
          <div class="_margin-top" v-html="$md.render(classroomPostForm || '')" />
        </div>



      </div>

    </div>
  </div>
</template>

<script>

export default {

  head () {
    const title = "Classroom Initiative"

    return {
      title,
    }
  },

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_classroom"
  },
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  // async asyncData({app, store}) {
  // },

  data: function () {
    return {
      classroomTitle: this.$cytosis.find('Content.classroom-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      classroomBg: this.$cytosis.find('Content.classroom-bg', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      classroomForm: this.$cytosis.find('Content.classroom-form', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      classroomPostForm: this.$cytosis.find('Content.classroom-postform', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  mounted: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

