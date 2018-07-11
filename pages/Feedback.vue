<template>

  <ContentFrame class="AnonFeedback container">
    <section class="narrow copy">
      <FormVomFeedback :postUrl="postUrl" />
    </section>
  </ContentFrame>
</template>

<script>

import { cytosis } from '~/assets/helpers.js'

import ContentFrame from '~/components/ContentFrame.vue'
import FormVomFeedback from '~/forms/FormVomFeedback.vue'
// import axios from 'axios'

export default {

  components: {
    ContentFrame,
    FormVomFeedback
  },

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      postUrl: env.ext_handler,
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },


  created: function () {
  },

  data: function () {
    return {
      cytosis: this.$store.cytosis,
      postUrl: 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input',
      isFormValid: false,
      Name: '',
      Email: '',
      Feedback: '',
      output: ''
    }
  },

  methods: {
    getForm(findStr) {
      const form = JSON.parse(this.cytosis.find(findStr)[0].fields.JSON) || undefined
      return form.inputs
    },
    formHandler(data) {
      // console.log('Form handler? ', data)
      if(data) {
        this.form = data
        this.isFormValid = true
      } else {
        this.isFormValid = false // required if validator is dirty
      }

    },
    submit() {
      if(this.isFormValid) {
        const data = {
          Name: this.form.Name.$model,
          Email: this.form.Email.$model,
          Feedback: this.form.Feedback.$model,
        }
        console.log('Submitting test data: ', data, this.form.Feedback.$model)
        axios.post(this.postUrl, data)
        .then(function (response) {
          console.log('response', response);
        })
        .catch(function (error) {
          console.log('error', error);
        });
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

