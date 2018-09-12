<template>

<!-- need a sending state -->

  <div class="Form"> 
    <div class="Form-intro " v-html="$md.render(intro)" v-if="intro">
    </div>

    <div class="Form-body">
      <div class="" v-if="!success && !error">
        <Formlet :inputs="getForm(source)" @handler="formHandler" ref="form"
        ></Formlet>
        <div class=" _grid-2-1 _align-vertically" >
          <div>
            <span class="Form-privacy _md--margin-none" v-html="content(privacy)"></span>
          </div>
          <button class="Form-btn _button _margin-none _center" @click="submit" v-if="!sending">{{cta}}</button>
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

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

import Formlet from '~/components/Formlet.vue'
import axios from 'axios'

export default {

  components: {
    ContentFrame,
    Formlet,
    // Formlet,
  },

  // note: set :json='true' to dump the payload into a table named JSON, to prevent throwing errors
  props: ['intro', 'source', 'privacy', 'cta', 'thanks', 'errorMsg', 'payload', 'table', 'json', 'postUrl', 'alert', 'notes'],

  // middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    console.log('async env', env)

    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      sending: false,
      cytosis: this.$store.state.cytosis,
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
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    },

    getForm(findStr) {
      const form = JSON.parse(this.cytosis.find(findStr)[0].fields.JSON) || undefined
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
          console.log('response', response);
          _this.success = true
          _this.sending = false
        })
        .catch(function (error) {
          console.log('error', error);
          _this.error = error
          _this.sending = false
        });
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

