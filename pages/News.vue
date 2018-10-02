
<!-- 

  Note: "blog" is the catch-all term for blog items, news articles, etc.
  this includes Capsid & Tail articles as well

  This page is used specifically for Phage Directory updates and blog
  On the "Blog" table these are of the type "Updates"

 -->

<template>
  <section class="Periodical narrow copy _margin-center _padding-top-2">

    <div class="News-intro _margin-bottom _flex _flex-bottom">
      <div class="" v-html="$md.render(title)"></div>
      <div class="" v-html="$md.render(intro)"></div>
    </div>

    <div class="_card _padding-2" v-for="issue of issues" :key="issue.id" v-if="issue.fields.isPublished">
      <div class="Periodical-header _grid-2">
        <div class="Periodical-title">{{ issue.fields['Name'] }}</div>
        <div class="Periodical-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>
      <!-- <div class="Periodical-tags">
        <span class="Periodical-tag _tag" v-for="issue of getTags(issue)" :key="issue">{{ issue }}</span>
      </div> -->
      <div class="Periodical-description _margin-bottom-2" v-html="$md.render(issue.fields['Markdown'])"></div>
    
      <div class="Periodical-item" v-for="article of getArticles(issue)" :key="article.id"
        :class="{'--image': article.fields.Images}"
        v-if="article.fields['isPublished']">

        <div class="Periodical-item-content">
          <div class="Periodical-item-header">
            <!-- <span class="BlogList-item-date" v-if="article.fields.PubDate">{{article.fields.PubDate}}</span> -->
            <span class="Periodical-item-source" v-if="article.fields.Source">{{article.fields.Source}}</span>
          </div>
          <h4 class="Periodical-item-title" v-if="article.fields.Category != 'Post'">
            <router-link :to="{path: `/updates/${article.fields.Slug}`}" v-if="!article.fields.External">{{article.fields.Name}}</router-link>
            <a target="_blank" :href="article.fields.Link" v-if="article.fields.External">{{article.fields.Name}}</a>
          </h4>
          <div class="Periodical-item-lede" v-if="article.fields.Lede">{{article.fields.Lede}}</div>
          <div class="Periodical-item-description _margin-bottom" v-if="article.fields.Markdown" v-html="$md.render(article.fields.Markdown)"></div>
          <div class="Periodical-item-tags">
            <span class="Periodical-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of article.fields.Tags" :key="tag">
              {{tag}}
            </span>
          </div>
        </div>
        <img class="Periodical-item-image" :src="article.fields.Images[0].thumbnails.large.url" v-if="article.fields.Images && article.fields.Images[0].thumbnails"/>
      </div>

      <div class="Periodical-updates" v-if="issue.fields.Updates">
        <h5 class="Periodical-updates-title">{{issue.fields['UpdatesTitle']}}</h5>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update.fields['isPublished']">
          <div class="_grid-1-6 _align-vertically">
            <div>
              <div class="_tag _center">{{ update.fields['Category'] }}</div>
            </div>
            <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown' || ''])"></div>
          </div>
        </div>
      </div>

    </div>
    <!-- <Article category="Updates" :content="article" v-if="slug && article"/> -->

    <!-- show full list of articles if no params given -->
    <!-- <div class="Blog-body" v-else> -->
    <!-- <div class="Blog-body" v-if="!article">
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
 -->
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

    const newsData = await store.dispatch('loadCytosis', {
      env,
      tableIndex: 'news',
    })

    const slug = unescape(route.params.slug)
    // const article = app.$cytosis.find(slug, [store.state.News], ['Slug'])

    // if (article && article.fields.isPublished == false)
    //   this.article = undefined
    const article = ''

    // console.log('newsData:', newsData)

    return {
      title: app.$cytosis.find('Content.news-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      intro: app.$cytosis.find('Content.news-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
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
      'C&T',
      'Articles',
      'Tags',
      ]),

    issues() {
      // const issueList = this.$cytosis.getFields(this.News, 'Issue')
      // let issues = []

      // for (let issue of issueList) {
      //   const records = this.$cytosis.find(issue, [this.News], ['Issue'])
      //   console.log(issue, '>', records)
      //   issues.push(issue)
      // }

      return this['C&T']
    }
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
    },
    getArticles(issue) {
      const articles = this.$cytosis.getLinkedRecords(issue.fields['Articles'], this['Articles'], true)
      return articles
    },
    getUpdates(issue) {
      const articles = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Articles'], true)
      return articles
    },
  }

}
</script>


<style lang="scss" scoped>

</style>

