<template>

  <ContentFrame class="Feedback Form container">
    <section class="narrow copy">

      <!-- <div class="Feedback-intro " v-html="content('feedback-intro')"></div> -->


      <Form class="Testform _card"
            :intro="rawContent('feedback-intro')"
            source="feedback-form"
            privacy="privacy-forms"
            cta="Send Feedback"
            thanks="#### Thank you for sending us feedback!"
            errorMsg="Something went wrong, please try again"
            table="Feedback"
            :postUrl="postUrl"
            :json="false"
            alert="true"
      >
      </Form>

      <!-- <div class="Feedback-form _card">
        <div class="" v-if="!success && !error">
          <Formlet :inputs="getForm('feedback-form')" @handler="formHandler" ref="form"
          ></Formlet>
          <div class=" _grid-2-1 _align-vertically" >
            <div>
              <span class="Privacy-forms _md--margin-none" v-html="content('privacy-forms')"></span>
            </div>
            <div class="Form-btn _button _margin-none _center" @click="submit">Send Feedback</div>
          </div>
        </div>

        <div class="" v-if="success">
          <h4>Thank you for sending us feedback!</h4>
        </div>

        <div class="" v-if="error">
          Something went wrong, please try again
        </div>
      </div> -->

    </section>
  </ContentFrame>
</template>

<script>

import Form from '~/components/Form.vue'
import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

// import Formlet from '~/components/Formlet.vue'
// import axios from 'axios'

export default {

  components: {
    ContentFrame,
    Form,
    // Formlet,
  },

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      postUrl: env.ext_handler,
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      // postUrl: 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input',
      // isFormValid: false,
      // Name: '',
      // Email: '',
      // Feedback: '',
      // success: false,
      // error: false
    }
  },


  computed: {
  },


  methods: {
    rawContent(findStr) {
      return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    },
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] ?  this.cytosis.find(findStr)[0].fields.Markdown : '')
    },

    // getForm(findStr) {
    //   const form = JSON.parse(this.cytosis.find(findStr)[0].fields.JSON) || undefined
    //   return form.inputs
    // },
    // formHandler(data) {
    //   // console.log('Form handler? ', data)
    //   if(data) {
    //     this.form = data
    //     this.isFormValid = true
    //   } else {
    //     this.isFormValid = false // required if validator is dirty
    //   }

    // },
    // submit() {
    //   const _this = this
    //   this.$refs.form.touch()

    //   // console.log('submitting, valid? ', this.isFormValid)
    //   if(this.isFormValid) {
    //     const data = {
    //       Name: this.form.name.$model,
    //       Email: this.form.email.$model,
    //       Feedback: this.form.feedback.$model,
    //     }
    //     // console.log('Submitting test data: ', data, this.form.feedback.$model)
    //     axios.post(this.postUrl, data)
    //     .then(function (response) {
    //       console.log('response', response);
    //       _this.success = true
    //     })
    //     .catch(function (error) {
    //       console.log('error', error);
    //       _this.error = error
    //     });
    //   }
    // }
  }

}
</script>

<style lang="scss" scoped>

</style>

