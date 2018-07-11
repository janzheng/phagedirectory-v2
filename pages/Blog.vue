<template>

  <ContentFrame class="Blog">
    <section class="narrow copy">

      <Article :blog="blog" :categoryName="getCategoryName" v-if="slug && blog"/>

      <!-- show full blog if no params given -->
      <div class="Blog-body" v-else>
        <div class="Page-header">
          <h1 class="Blog-title Page-title title">
            {{ getCategoryName }}
          </h1>
          <!-- <div clas="Page-intro" v-if="getCategoryName == 'Updates'" v-html="content('blog-updates-intro')"></div> -->
          <div clas="Page-intro" v-if="getCategoryName == 'Updates'" v-html="content('blog-updates-intro')">
          </div>
          <div clas="Page-intro" v-if="getCategoryName == 'News'" v-html="content('blog-news-intro')"></div>
        </div>

        <div class="BlogList" v-if="Blog">
          <div class="BlogList-item" v-for="blog of Blog" :key="blog.fields.Name" 
            :class="{'--image': blog.fields.Images}"
            v-if="blog.fields.isPublished && categoryFilter(blog)">
            <div class="BlogList-content">
              <div>
                <span class="BlogList-date" v-if="blog.fields.PubDate">{{blog.fields.PubDate}}</span>
                <span class="BlogList-source" v-if="blog.fields.Source">{{blog.fields.Source}}</span>
              </div>
              <h3 class="BlogList-title _padding-bottom-half">
                <router-link :to="{path: `/${category}/${blog.fields.Slug}`}" v-if="!blog.fields.out">{{blog.fields.Name}}</router-link>
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
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Article from '~/components/Article.vue'

import { cytosis } from '~/assets/helpers.js'


export default {

  components: {
    ContentFrame,
    Article
  },

  middleware: 'pageload',

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      slug: this.$route.params.slug,
      blog: undefined, // loaded in 'mounted'
      category: undefined, // updates (internal), news (news links), blog (both)
    }
  },

  mounted: async function () {
    this.category = this.$route.name 
    console.log('route:', this.$route)
    const slug = unescape(this.$route.params.slug)
    // console.log('!!!', this.$store.state.cytosis.find(slug, [this.Blog], ['Slug'])[0], ' vs. ', this.cytosis.find(slug, [this.Blog], ['Slug'])[0])
    // console.log('???', this.$store.state.cytosis.find(slug, [this.Blog], ['Slug'])[0])
    const blog = this.cytosis.find(slug, [this.Blog], ['Slug'])[0]
    if (blog && blog.fields.isPublished)
      this.blog = blog
  },

  computed: {
    blogs() { // show the published blogs
      return ''
    },
    getCategoryName() {
      let category = this.category
      if(category) {
        const split = category.split('.') // e.g. Blog.item
        if (split.length > 0)
          category = split[0]
        // if (category == '')

        console.log('split:',split)
      }
      return category
    }
  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
    categoryFilter(blog) {
      if (this.category == 'Blog')
        return true

      if (blog.fields.Category == this.category)
        return true
    }
  }

}
</script>


<style lang="scss" scoped>

</style>

