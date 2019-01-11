<template>

  <!-- 

    JSON mode means JSON-ONLY!! all content will be saved into the JSON column
    - normally form data is saved into Airtable columns. Sometimes there's a mismatch, and airtable won't save correctly
    - this also means that your forms will quietly drop user form data
    - with JSON-mode, all data is purely saved into the JSON column, meaning you'll get all your data, but it'll be fugly 

   -->

  <div class="Form"> 
    <div v-if="intro" class="Form-intro " v-html="$md.render(intro)" />
    <div class="Form-body">
      <div v-if="!success && !error">
        <Formlet ref="form" :inputs="getForm(source)" @handler="formHandler" />
        <div class=" _grid-3-2 _align-vertically" >
          <div>
            <span class="Form-privacy _md-p_fix" v-html="$md.render(privacy)" />
          </div>
          <button v-if="!sending" class="Form-btn _button _margin-none _center" @click="submit" >{{ cta }}</button>
          <button v-if="sending" class="Form-btn _button --outline _margin-none _center" >Sending...</button>
        </div>
      </div>

      <div v-if="success" class="" v-html="$md.render(thanks)">
        <h4>Thank you for sending us feedback!</h4>
      </div>

      <div v-if="error" class="" v-html="$md.render(errorMsg)">
        Something went wrong, please try again
      </div>
    </div>

  </div>
</template>

<script>

import Formlet from '~/components/Formlet.vue'
import axios from 'axios'

export default {

  components: {
    Formlet,
  },

  // source is the form's json source
  // set :json='true' to dump the payload into a table named JSON, to prevent throwing errors
  // alert: sends us an email alert (this is through the server)
  props: {
    'intro': String,
    'source': String,
    'privacy': String,
    'cta': String,
    'thanks': String,
    'errorMsg': String,
    'payload': String,
    'table': String,
    'postUrl': String,
    'isAlert': Boolean,
    'isJson': Boolean,
    'notes': String,
  },

  data: function () {
    return {
      sending: false,
      // postUrl: '', // https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input
      isFormValid: false,
      Name: '',
      Email: '',
      Feedback: '',
      success: false,
      error: false
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
      if(data) {
        this.form = data
        this.isFormValid = true
      } else {
        this.isFormValid = false // required if validator is dirty
      }
    },
    submit() {
      const _this = this
      this.$refs.form.touch()

      if(this.isFormValid && !this.sending) {
        const data = {
          type: 'form',
          table: this.table,
          json: this.json,
          alert: this.alert,
          notes: this.notes,
          data: {
            ... this.form.$model,
            ... this.payload,
            Source: this.source
          }
        }

        this.sending = true

        // console.log('Submitting test data: ', data)
        axios.post(this.postUrl, data)
        .then(function (response) {
          console.log('Message sent! Status:', response.status)
          // if(status.status == 200) {
            _this.success = true
            _this.sending = false
          // }
        })
        .catch(function (error) {
          console.log('error', error)
          _this.error = error
          _this.sending = false
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

