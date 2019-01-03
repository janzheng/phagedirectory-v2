<!-- 

  Originally meant to get a list of links like Sidebar, this is now unused


 -->
<template>

  <section class="Capsid narrow copy _margin-center _padding-top-2">
    
    <div class="_card _padding-2" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">
      <div class="Capsid-header _grid-2">
        <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
        <div class="Capsid-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>
      <div class="Capsid-description _margin-bottom-2" v-html="$md.render(issue.fields['Markdown'])"></div>
  

      <div class="Capsid-updates" v-if="getUpdates(issue)">
        <h5 class="Capsid-updates-title">{{issue.fields['UpdatesTitle'] || 'What’s New'}}</h5>
        <div class="Capsid-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown' || ''])"></div>
          <div v-if="update.fields['Tags']">
            <span class="Capsid-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of update.fields.Tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <!-- <hr class="_padding-top-2" /> -->
      </div>


      <div class="Capsid-item" v-for="article of getArticles(issue)" :key="article.id"
        :class="{'--image': article.fields.Images}"
        v-if="article.fields['isPublished']">

        <!-- most articles will have standard content, unless custom -->
        <div class="Capsid-item-content" v-if="!article.fields.isCustom">
          <div class="Capsid-item-header">
            <!-- <span class="BlogList-item-date" v-if="article.fields.PubDate">{{article.fields.PubDate}}</span> -->
            <span class="Capsid-item-source" v-if="article.fields.Source">{{article.fields.Source}}</span>
          </div>
          <!-- MdTitle is the alternate Markdown title, necessary for organism names etc.
            it's in a separate field to keep the Name intact and searchable
           -->
          <h4 class="Capsid-item-title" v-if="!article.fields['MdTitle']">
            <!-- <router-link :to="{path: `/updates/${article.fields.Slug}`}" v-if="!article.fields.External">{{article.fields.Name}}</router-link> -->
            <a target="_blank" :href="article.fields.Link" v-if="article.fields.External" v-html="getArticleName(article)"></a>
            <span class="Capsid-item-title" v-html="getArticleName(article)" v-else></span>
          </h4>
          <div class="Capsid-item-title Capsid-alttitle" v-html="getArticleName(article)" v-else></div>

          <!-- too much noise? -->
          <div class="Capsid-item-author" v-if="article.fields.Author">{{article.fields.Author}}</div>
          <div class="Capsid-item-lede" v-if="article.fields.Lede">{{article.fields.Lede}}</div>
          <div class="Capsid-item-description _margin-bottom" v-if="article.fields.Markdown" v-html="$md.render(article.fields.Markdown)"></div>
          <div class="Capsid-item-tags">
            <span class="Capsid-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of article.fields.Tags" :key="tag">
              {{tag}}
            </span>
          </div>
        </div>
        otherwise display the custom markdown instead of the other content
        <div v-html="article.fields.Markdown"  v-else>
          (custom html here)
        </div>


        <img class="Capsid-item-image" 
          :class="article.fields.imgContain ? '--contain' : ''"
          :src="article.fields.Images[0].thumbnails.large.url" v-if="article.fields.Images && article.fields.Images[0].thumbnails"
        />
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

import { mapState } from 'vuex'

export default {
  props: ['issues', 'showPreview'],

  components: {
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
      ]),
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
    },
    getArticles(issue) {
      const articles = this.$cytosis.getLinkedRecords(issue.fields['Articles'], this['Articles'], true)
      // return articles
      return articles.reverse() // this flips it 'downside-up w/r to the airtable order'
    },
    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Articles'], true)
      // console.log('get updates:', updates)
      return updates || undefined
    },
    getArticleName(article) {
      if(article.fields['MdTitle'])
        return this.$md.render(article.fields['MdTitle'])
      else 
        return article.fields['Name']
    },
  }

}
</script>

