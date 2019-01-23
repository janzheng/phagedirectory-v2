
<template>

  <div v-if="getJobStatus(job) != 'Expired'" class="Job" >
    <div class="Job-meta">

      <div class="Job-meta _grid-3-1 _grid-gap-small _align-bottom _margin-bottom-half">
        <div>
          <div v-if="getAttachment(job)" class="Job-org-logo _margin-bottom-half" >
            <img :src="getAttachment(job)" alt="Job logo">
          </div>
          <div class="">
            <span class="_tag --highlight">{{ job.fields['JobType'] }}</span> <span v-for="tag of job.fields['Tags']" :key="tag" class="_tag">{{ tag }}</span>
            <span v-if="getJobStatus(job)" class="Job-status _tag ">{{ getJobStatus(job) }}</span>
          </div>
        </div>
        <div class="Job-date _right-sm _font-small _padding-bottom-quart">
          Added {{ job.fields['PostedDate'] | dateTo }}

        </div>
      </div>
    </div>

    <div class="Job-org _margin-top">
      <!-- <a v-if="getJobStatus(job) != 'Expired' && getJobLink(job) != false " :href="getJobLink(job)" class="Job-link"> 
        <h2 class="Job-title">{{ job.fields['Name'] }}</h2>
      </a>
      <div v-else class="Job-link"> -->
      <h2 class="Job-title">{{ job.fields['Name'] }}</h2>
      <!-- </div> -->
    </div>

    <div class="_grid-3-2 _grid-gap-none">
      <div>
        <div v-if="job.fields['OrgUrl']">
          <a :href="job.fields['OrgUrl']" class="Job-org _font-bold" >{{ job.fields['Org'].join(', ') }}</a>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
        </div>
        <div v-else>
          <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
        </div>
      </div>
      <div v-if="job.fields['Supervisor']" class="Job-supervisor _right-sm">
        <div>{{ job.fields['Supervisor'] }}</div>
      </div>
    </div>

    <div class="Job-description --short _wordbreak-link _padding-top " v-html="$md.render(job.fields['LongMarkdown'] || '')" />

    <!-- a job w/ full page should ALWAYS have a way to apply -->
    <div v-if="getJobStatus(job) != 'Expired'" class="Job-apply _wordbreak-link">
      <div class="Job-apply-box _card _padding">
        <h6>Application Process</h6>
        <div class="Job-apply-notes _wordbreak-link" v-html="$md.render(job.fields['ApplyNotes'] || '')" />
        <div>
          <a v-if="job.fields['ApplyUrl']" :href="job.fields['ApplyUrl']" class="Job-action-apply _button CTA --short _margin-bottom-none _margin-right-half">Apply for Position</a>
        </div>
      </div>
      <div class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </div>
    </div>

    <!-- buttons to apply / more -->
    <!-- <div v-if="getJobStatus(job) != 'Expired' && job.fields['URL']" class="Job-action "> -->
    <!-- <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply _button CTA --short _margin-bottom-none _margin-right-half">Apply</a> -->
    <!-- <router-link v-if="job.fields['DetailsUrl']" :to="job.fields['DetailsUrl']" class="Job-action-apply _button --outline --short _margin-bottom-none _margin-right-half">More Details</router-link> -->
    <!-- expiration date -->
    <!-- <div v-if="job.fields['ExpirationDate']" class="Job-expiry _font-small --nowrap"> -->
    <!-- Last day to apply: <span class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </span> -->
    <!-- </div> -->
    <!-- </div> -->

    <div v-else>
      <h2>Sorry, the job you're looking for has expired.</h2>
      <div>Go visit our <a href="/jobs">jobs page</a> to see other phage jobs!</div>
    </div>

  </div>

</template>


<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'job': Object,
  },

  methods: {
    getAttachment(job) {
      // currently only works for the first attachment
      if(job.fields['Attachments']) {
        // console.log('attachments', job.fields['Attachments'][0]['url'])
        return job.fields['Attachments'][0]['url']
      }
    },

    getJobLink(job) {
      // if (job.fields['DetailsUrl'] && job.fields['hasFullPage'])
      //   return job.fields['DetailsUrl']

      if (job.fields['URL'])
        return job.fields['URL']

      return '#' 
    },

    showJob(job) {
      if (!job.fields['isPublished'])
        return undefined 

      // if (job.fields['Status'] == 'Expired')
      //   return undefined 

      if (Date(job.fields['ExpirationDate']) < Date.now())
        return undefined 

      return true
    },

    getJobStatus(job) {
      return job.fields['Status'] || undefined
    },

  }

}
</script>

