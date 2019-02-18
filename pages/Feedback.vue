<template>

  <section class="AnonFeedback _section-page _margin-center">
    <div class="_section-content _margin-center">
      <DynamicForm />
    </div>
  </section>
</template>

<script>

// import DynamicForm from '~/forms/FormPhageFutures.vue'
import DynamicForm from '~/forms/FormContact.vue'
// import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
// import FormVomFeedback from '~/forms/FormVomFeedback.vue'

export default {

  components: {
    DynamicForm
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_basic"
  },

  data: function () {
    return {
    }
  },

  // async asyncData({ app, store, env, params }) {
  //   return {
  //   }
  // },

  created: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

