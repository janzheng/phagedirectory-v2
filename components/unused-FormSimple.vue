<template>

<!-- 

  JSON mode means JSON-ONLY!! all content will be saved into the JSON column
  - normally form data is saved into Airtable columns. Sometimes there's a mismatch, and airtable won't save correctly
  - this also means that your forms will quietly drop user form data
  - with JSON-mode, all data is purely saved into the JSON column, meaning you'll get all your data, but it'll be fugly 

 -->

  <div class="Form"> 
    <div class="Form-intro " v-html="$md.render(intro)" v-if="intro" />

    {{ output }}

    <div class="Form-body">
      <div class="" v-if="!success && !error">
        <FormletSimple :inputs="getForm(source)" @handler="formHandler" ref="form" />
        <div class=" _grid-2-1 _align-vertically" >
          <div>
            <span class="Form-privacy _md--margin-none" v-html="$md.render(privacy)"></span>
          </div>

          ?!?!!?!?!?!?

          <button class="Form-btn _button _margin-none _center" @click="explode">CLICK ME!!</button>

          <button class="Form-btn _button _margin-none _center" @click="submit" v-if="!sending">{{cta}}!!!!</button>
          <button class="Form-btn _button --outline _margin-none _center" v-if="sending">Sending...</button>

        </div>
      </div>

      <div class="" v-if="success" v-html="$md.render(thanks)">
        <h4>Thank you for sending us feedback!</h4>
      </div>

      <div class="" v-if="error" v-html="$md.render(errorMsg)">
        Something went wrong, please try again
      </div>
    </div>

  </div>
</template>

<script>

import FormletSimple from '~/components/FormletSimple.vue'
import axios from 'axios'

export default {

  components: {
    FormletSimple,
  },

  // source is the form's json source
  // set :json='true' to dump the payload into a table named JSON, to prevent throwing errors
  // alert: sends us an email alert (this is through the server)
  props: ['intro', 'source', 'privacy', 'cta', 'thanks', 'errorMsg', 'payload', 'table', 'json', 'postUrl', 'alert', 'notes'],

  data: function () {
    return {
      sending: false,
      // postUrl: '', // https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input
      isFormValid: false,
      Name: '',
      Email: '',
      Feedback: '',
      success: false,
      error: false,
      formdata: {},
      output: "",
    }
  },

  computed: {
  },


  methods: {

    getForm(formStr) {
      // console.log('getform:', formStr)
      const form = JSON.parse(formStr) || undefined
      return form.inputs
    },
    formHandler(data) {
      console.log('form handler data:', data)
      if(!!data) {
        this.formdata = data
        this.isFormValid = true
        console.log('data valid:',this.formdata)
      } else {
        this.isFormValid = false // required if validator is dirty
      }
      console.log('end data:',this.formdata)
    },


    explode() {
      alert('EXPLODE!')
      this.output = "EXPLOOOODE"
    },

    submit() {
      const _this = this
      // this.$refs.form.touch()

      console.log('submit dataform:', this.formdata)

      if(this.isFormValid && !this.sending) {
        const data = {
          type: 'form',
          table: this.table,
          json: this.json,
          alert: this.alert,
          notes: this.notes,
          data: {
            // ... this.form.$model,
            content: this.formdata,
            ... this.payload,
            Source: this.source
          }
        }

        this.sending = true


        // TESITNG

        console.log('axios:', data)
        alert(`axios sends`)
        this.output = data
        this.sending = false

        // console.log('Submitting test data: ', data)
        // axios.post(this.postUrl, data)
        // .then(function (response) {
        //   console.log('Message sent! Status:', response.status);
        //   // if(status.status == 200) {
        //     _this.success = true
        //     _this.sending = false
        //   // }
        // })
        // .catch(function (error) {
        //   console.log('error', error);
        //   _this.error = error
        //   _this.sending = false
        // });
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

