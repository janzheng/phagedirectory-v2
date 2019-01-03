
<!-- 

  Note: "blog" is the catch-all term for blog items, news articles, etc.
  this includes Capsid & Tail articles as well

  This page is used specifically for Phage Directory updates and blog
  On the "Blog" table these are of the type "Updates"

 -->

<template>
  <section class="Updates narrow copy _margin-center _padding-top-2">

    <Article :content="article" v-if="slug && article"/>

    <!-- show full list of articles if no params given -->
    <!-- <div class="Blog-body" v-else> -->
    <div class="Blog-body" v-if="!article">
      <div class="Page-header">
        <h1 class="Blog-title Page-title title">
          {{ title }}
        </h1>
        <div clas="Page-intro" v-html="$md.render(intro)"></div>
      </div>

      <div class="BlogList" v-if="Blog">
        <div class="BlogList-item" v-for="blog of Blog" :key="blog.fields.Name" 
          :class="{'--image': blog.fields.Images}"
          v-if="blog.fields.isPublished && blog.fields.Category == 'Updates'">

          <div class="BlogList-content">
            <div>
              <span class="BlogList-date" v-if="blog.fields.PubDate">{{blog.fields.PubDate}}</span>
              <span class="BlogList-source" v-if="blog.fields.Source">{{blog.fields.Source}}</span>
            </div>
            <h3 class="BlogList-title _padding-bottom-half">
              <router-link :to="{path: `/updates/${blog.fields.Slug}`}" v-if="!blog.fields.out">{{blog.fields.Name}}</router-link>
              <a target="_blank" :href="blog.fields.Link" v-if="blog.fields.out">{{blog.fields.Name}}</a>
            </h3>
            <div class="BlogList-lede" >{{blog.fields.Lede}}</div>
            <div class="BlogList-tags">
              <span class="BlogList-tag _tag" v-for="tag of blog.fields.Tags" :key="tag">
                {{tag}}
              </span>
            </div>
          </div>
          <img class="BlogList-image" :src="blog.fields.Images[0].thumbnails.large.url" v-if="blog.fields.Images && blog.fields.Images[0].thumbnails"/>
        </div>
      </div>

    </div>

  </section>
</template>

<script>

import Article from '~/components/Article.vue'
import { mapState } from 'vuex'


export default {

  components: {
    Article
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {
    const cytosis = store.state.cytosis


    const slug = unescape(route.params.slug)
    const article = app.$cytosis.find(slug, [store.state.Blog], ['Slug'])

    if (article && article.fields.isPublished == false)
      this.article = undefined

    return {
      intro: app.$cytosis.find('Content.updates-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      title: app.$cytosis.find('Content.updates-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
      article
    }
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
    ...mapState([
      'Content',
      'Blog'
      ]),

  },


  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

