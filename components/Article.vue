<!-- 

  This is for rendering a blog post, sorry for the bad naming

 -->
<template>

  <div class="Article" >
    <div class="Article-frontmatter">
      <div class="Article-back">
        <router-link :to="`/${category}`" v-if="category">Back to {{category}}</router-link>
      </div>
      <div class="Article-title"><h1>{{content.fields.Name}}</h1></div>
      <div class="Article-lede" v-html="$md.render(content.fields.Lede)"></div>
      <div class="Article-tags">
        <span class="Article-tag _tag" v-for="tag of content.fields.Tags" :key="tag">
          {{tag}}
        </span>
      </div>
    </div>

    <div class="Article-content" v-html="$md.render(content.fields.Markdown || '')"></div>

    <!-- required to render twitter embeds properly -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" v-if="content.fields.hasTweets"></script>
  </div>

</template>


<script>

import { cytosis } from '~/assets/helpers.js'

export default {
  props: ['category', 'content'],

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

