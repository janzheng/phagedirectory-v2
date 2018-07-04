
<template>

  <div class="Article" >
    <div class="Article-frontmatter">
      <div class="Article-back">
        <router-link :to="`/${categoryName}`" v-if="categoryName">{{categoryName}}</router-link>
      </div>
      <div class="Article-title"><h1>{{blog.fields.Name}}</h1></div>
      <div class="Article-lede" v-html="$md.render(blog.fields.Lede)"></div>
      <div class="Article-tags">
        <span class="Article-tag _tag" v-for="tag of blog.fields.Tags" :key="tag">
          {{tag}}
        </span>
      </div>
    </div>

    <div class="Article-content" v-html="$md.render(blog.fields.Markdown || '')"></div>

    <!-- required to load twitter -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" v-if="blog.fields.hasTweets"></script>
  </div>

</template>


<script>

import { cytosis } from '~/assets/helpers.js'

export default {
  props: ['categoryName', 'blog'],

  components: {
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
  },


  methods: {
  }

}
</script>

