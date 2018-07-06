

<!-- 

  NOTE:: currently we find labs through people, but some people (like Jess) may span multiple labs,
  this ends up adding people to the wrong orgs

 -->
<template>

  <div class="DirectoryView _margin-top" :class="view" >
    <!-- DirectoryView view: {{view}} search: {{search}} -->

    <div class="DirectoryView phages" v-if="view == 'phages' ">
      <div class="DirectoryView-view">
        <h3 >Phage Hosts<span class="DirectoryView-search" v-if="search">: <span>{{search}}</span></span></h3>
        <div class="DirectoryView-contact">
          Found an error? Please email <a href="mailto:staff@phage.directory">staff@phage.directory</a>
        </div>
      </div>

      <div class="DirectoryView-items" v-for="genus of getGenus" :key="genus.fields.Name">
        <div class="DirectoryView-item" v-for="host of getHosts(genus)" :key="host.fields.Name" v-if="filterHost(search, host)">
          <div class="DirectoryView-head phage-head">
            <div class="DirectoryView-title phage-name _OrganismName">{{ hostDisplayName(host) }}</div>
          </div>
          <div class="DirectoryView-body phage-body">
            <div class="DirectoryView-subitem phage-lab" v-for="lab of getLabs(host)" :key="lab.fields.Name" v-if="lab.get('isPublished')">
              <div class="DirectoryView-meta phage-lab-meta">
                <div class="DirectoryView-meta-title phage-lab-org">{{ getLinkedOrgNames(lab) }}</div>
              </div>
              <div class="phage-lab-content">
                <div class="phage-lab-header">
                  <div class="DirectoryView-subtitle phage-lab-name" v-if="!lab.isPerson">{{ lab.fields.Name }}</div>
                </div>
                <div class="phage-lab-body">
                  <div class="DirectoryView-subcontent lab-person person-info" v-for="person of getPerson(lab)" :key="person.fields.Name" v-if="person.get('isPublished')">
                    <div class="person-name">{{ person.fields.Name }}</div>
                    <div>
                      <span class="_tag person-pi" v-if="person.fields.PI">PI</span>
                      <span class="person-meta" v-if="person.fields.Role">{{person.fields.Role}}</span>
                      <span class="person-social">
                        <a :href="`https://twitter.com/${person.fields.Twitter}`" target="_blank" class="person-twitter" v-if="person.fields.Twitter">@{{person.fields.Twitter}}</a>
                        <a :href="`${person.fields.GoogleScholar}`" target="_blank" class="person-gscholar" v-if="person.fields.GoogleScholar">GS</a>
                        <a :href="`https://orcid.org/${person.fields.ORCID}`" target="_blank" class="person-orcid" v-if="person.fields.ORCID">ORCID</a>
                        <a :href="`${person.fields.ResearchGate}`" target="_blank" class="person-rgate" v-if="person.fields.ResearchGate">RG</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="DirectoryView labs" v-if="view == 'labs' ">
      <div class="DirectoryView-view">
        <h3 >Phage Labs<span class="DirectoryView-search" v-if="search">: <span>{{search}}</span></span></h3>
        <div class="DirectoryView-contact">
          Found an error? Please email <a href="mailto:staff@phage.directory">staff@phage.directory</a>
        </div>
      </div>

      <div class="DirectoryView-items" >

        <div class="DirectoryView-item" v-for="org of getOrgs" :key="org.fields.Name" v-if="filterOrg(search, org) && org.get('isPublished')">
          <div class="DirectoryView-head lab-org">
            <div class="DirectoryView-title lab-orgname">{{org.fields.Name}}</div>
            <div class="DirectoryView-title-desc lab-longname" v-if="org.fields.LongName">{{org.fields.LongName}}</div>
            <div class="DirectoryView-info">{{org.fields.Markdown}}</div>
          </div>
          <div class="DirectoryView-body lab-body">
            <div class="DirectoryView-subitem" v-for="lab of getLabs(org)" :key="lab.fields.Name" v-if="lab.fields.isPublished">
              <div class="DirectoryView-subtitle lab-name">{{ lab.fields.Name }}</div>
              <div class="DirectoryView-subcontent lab-people">
                <!-- <div class="DirectoryView-subcontent-title">Timothy Lu Lab</div> -->
                <!-- <div class="DirectoryView-subcontent-info lab-person" v-for="person of getPerson(org)" :key="person.fields.Name">
                  {{ person.fields.Name }}
                  <div class="DirectoryView-subcontent-item" v-for="host of getHosts(person)" :key="host.fields.Name">
                    {{ host.fields.Name }}
                  </div>
                </div> -->
                <div class="DirectoryView-subcontent lab-person " v-for="person of getPerson(org)" :key="person.fields.Name" v-if="person.get('isPublished')">
                  <div class="person-info">
                    <div class="person-name">{{ person.fields.Name }}</div>
                    <div>
                      <span class="_tag person-pi" v-if="person.fields.PI">PI</span>
                      <span class="person-meta" v-if="person.fields.Role">{{person.fields.Role}}</span>
                      <span class="person-social">
                        <a :href="`https://twitter.com/${person.fields.Twitter}`" target="_blank" class="person-twitter" v-if="person.fields.Twitter">@{{person.fields.Twitter}}</a>
                        <a :href="`${person.fields.GoogleScholar}`" target="_blank" class="person-gscholar" v-if="person.fields.GoogleScholar">GS</a>
                        <a :href="`https://orcid.org/${person.fields.ORCID}`" target="_blank" class="person-orcid" v-if="person.fields.ORCID">ORCID</a>
                        <a :href="`${person.fields.ResearchGate}`" target="_blank" class="person-rgate" v-if="person.fields.ResearchGate">RG</a>
                      </span>
                    </div>
                  </div>
                  <div class="person-phages">
                    <div class="DirectoryView-subcontent-item person-hosts _OrganismName" v-for="host of getHosts(person)" :key="host.fields.Name">
                      {{ hostDisplayName(host) }}
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

      </div>
    </div>



  </div>

</template>










<script>

import { cytosis, deduplicate, sort, search } from '~/assets/helpers.js'
import DirectoryView from '~/components/DirectoryView.vue'

export default {
  props: ['search','view'],

  components: {
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      ... this.$store.state.cytosis.tables,
    }
  },

  mounted: async function () {
  },

  computed: {
    getOrgs() {
      // return search(this.search, this.Organizations, ['Name', 'LongName', 'Labs', 'People', 'Phage'], this.cytosis )
      return this.Organizations
    },
    getGenus() {
      // return search(this.search, this.HostGenus, ['Name','Hosts','HostSpecies','TrivialName'], this.cytosis )
      return this.HostGenus // result
    },

  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] ?  this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
    getLabs(org) {
      // instead of creating a Host > Lab link (more work), we look at the curators and their labs
      // not everyone has a lab though, so add those people to the end
      const people = this.cytosis.getLinkedRecords(org.fields.People, this.People, true)
      let labArr = [], ppl = []
      for (let p of people) {
        if(p.fields.Labs)
          labArr = [...labArr, ...p.fields.Labs]
        else {
          p['isPerson'] = true;
          console.log('isPerson:', p)
          ppl.push(p)
        }
      }
      
      labArr = deduplicate(labArr) // dedup
      const labs = sort(this.cytosis.getLinkedRecords(labArr, this.Labs, true))
      // sort labs first, then tack on the stragglers who don't have labs (if any)
      return [...labs, ...ppl]
    },
    getPerson(lab) {
      // search + filtering go in here, tbd
      const source = lab.fields.People 

      if(!source)
        return [lab] // 'lab' could actually also be a person

      return this.cytosis.getLinkedRecords(source, this.People, true)
    },
    getHosts(obj) {
      // sort hosts by A>Z
      const hosts = sort(this.cytosis.getLinkedRecords(obj.fields.Hosts, this.Hosts, true))
      return hosts
    },
    getLinkedOrgNames(obj) {
      // sort hosts by A>Z
      const orgs = sort(this.cytosis.getLinkedRecords(obj.fields.Organization, this.Organizations, true))

      let result = []
      for (let org of orgs ) {
        result.push(org.get('Name'))
      }
      return result.join(', ')
    },
    hostDisplayName(host) {
      // remove the * from display name (so it's Campylobacter instead of Campylobacter *)
      // but the * version still needs to show before its other hosts b/c it's encompassing
      if (host.fields.Name.indexOf('*') > 0)
        return host.fields.Name.substring(0, host.fields.Name.indexOf('*') - 1)
      return host.fields.Name
    },

    filterHost(str, host) {
      // console.log(host)

      if(!host.get('People'))
        return false // no people or labs attached to some generated hosts

      str = str.toLowerCase()

      if(str) {
        // match against Host name and People
        const people = this.cytosis.getLinkedRecords(host.get('People'), this.People, true)
        const hostName = host.get('Name').toLowerCase()
        if( hostName.includes(str) ||
            search(str, people, ['Name'], this.cytosis ).length > 0
          ) {
          // console.log('filterHost direct match:', str)
          return true
        }

        // match against Lab and Org name
        if(search(str, this.getLabs(host), ['Name', 'Organization'], this.cytosis ).length > 0)
          return true

        return false
      }
      return true
    },

    filterOrg(str, org) {
      if( (!org.get('People') && !org.get('Labs')) || !org.get('isPublished'))
        return false // no people or labs attached to some orgs

      str = str.toLowerCase()
      if(str) {
        // match against Host name and People
        const orgName = org.get('Name').toLowerCase()
        const longName = org.get('LongName') ? org.get('LongName').toLowerCase() : ''
        const people = this.cytosis.getLinkedRecords(org.get('People'), this.People, true)
        const labs = this.cytosis.getLinkedRecords(org.get('Labs'), this.Labs, true)

        if( orgName.includes(str) ||
            longName.includes(str) ||
            search(str, people, ['Name'], this.cytosis ).length > 0 ||
            search(str, labs, ['Name'], this.cytosis ).length > 0 || 
            search(str, people, ['Name'], this.cytosis ).length > 0
          ) {
          // console.log('filterHost direct match:', str)
          return true
        }

        // match through each person's Host names
        for (let person of people) {
          // console.log('person:',person)
          // const hosts = person.get('Hosts')
          const hosts = this.cytosis.getLinkedRecords(person.get('Hosts'), this.Hosts, true)
          if (search(str, hosts, ['Name'], this.cytosis ).length > 0) {
            return true
          }
        }

        // // match against Lab and Org name
        // if(search(str, this.getLabs(host), ['Name', 'Organization'], this.cytosis ).length > 0)
        //   return true

        return false
      }

      return true
    },

    
  }

}
</script>


