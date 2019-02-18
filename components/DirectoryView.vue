

<!-- 

  NOTE:: 
    currently we find labs through people, but some people (like Jess) may span multiple labs,
    this ends up adding people to the wrong orgs

  Bug:
    - searching for Harvard turns up U of Isfahan

  Todo:
    - replace str with this.search

 -->
<template>

  <div :class="view" class="DirectoryView _margin-top" >


    <div v-if="view == 'phages' " class="DirectoryView phages" >
      <!-- <div class="DirectoryView-view"> -->
      <!-- <div> -->
      <!-- <h3 >Phage Hosts<span class="DirectoryView-search" v-if="search">: <span>{{search}}</span></span></h3> -->
      <!-- <h3 v-if="search">Host Search<span class="Directory-search">: <span>{{ search }}</span></span></h3> -->
      <!-- </div> -->
      <!-- </div> -->

      <!-- Empty search state -->
      <div v-if="getCounts.peopleCount == 0 && search" class="_section-content Directory-view-emptySearch">
        <h3>No results found for <span>{{ search }}</span> </h3>
      </div>

      <div class="DirectoryView-meta">
        <h4>Phage Hosts: {{ getHostCount(filterHost) }}, Labs: {{ getOrgCount(filterOrg) }}</h4>
      </div>

      <div v-for="genus of getGenuses" :key="genus.fields.Name" class="DirectoryView-items" >
        <div v-for="host of getHosts(genus)" v-if="filterHost(host)" :key="host.fields.Name" class="DirectoryView-item" >
          <!-- <div v-for="host of getFilteredHostsFromGenus(genus)" :key="host.fields.Name" class="DirectoryView-item" > -->
          <div class="DirectoryView-head phage-head">
            <div class="DirectoryView-title phage-name _organismName">{{ hostDisplayName(host) }}</div>
          </div>
          <div class="DirectoryView-body phage-body">
            <div v-for="lab of getLabs(host)" v-if="lab.fields['isPublished'] && filterOrg(lab)" :key="lab.fields.Name" class="DirectoryView-subitem phage-lab">
              <div class="DirectoryView-meta phage-lab-meta">
                <div class="DirectoryView-meta-title phage-lab-org">{{ getLinkedOrgNames(lab).name }}<span v-if="getLinkedOrgNames(lab).longName" class="DirectoryView-meta-longname phage-lab-org" > — {{ getLinkedOrgNames(lab).longName }}</span></div>
              </div>
              <div class="phage-lab-content">
                <div class="phage-lab-header">
                  <div v-if="!lab.isPerson" class="DirectoryView-subtitle phage-lab-name" >{{ lab.fields.Name }}</div>
                </div>
                <div class="phage-lab-body">
                  <div v-for="person of getPerson(lab)" v-if="person.fields['isPublished']" :key="person.fields.Name" class="DirectoryView-subcontent lab-person person-info" >
                    <div class="person-name">{{ person.fields.Name }}</div>
                    <div class="person-miniprofile">
                      <span v-if="person.fields.PI" class="_tag _margin-none person-pi" >PI</span>
                      <span v-if="person.fields.Role" class="person-meta" >{{ person.fields.Role }}</span>
                      <span class="person-social">
                        <a v-if="person.fields.Twitter" :href="`https://twitter.com/${person.fields.Twitter}`" target="_blank" class="person-twitter" >@{{ person.fields.Twitter }}</a>
                        <a v-if="person.fields.GoogleScholar" :href="`${person.fields.GoogleScholar}`" target="_blank" class="person-gscholar" >GS</a>
                        <a v-if="person.fields.ORCID" :href="`https://orcid.org/${person.fields.ORCID}`" target="_blank" class="person-orcid" >ORCID</a>
                        <a v-if="person.fields.ResearchGate" :href="`${person.fields.ResearchGate}`" target="_blank" class="person-rgate" >RG</a>
                      </span>
                    </div>
                    <div v-if="person.fields.Phages" class="person-phages" >
                      <span v-for="phage of getHostPersonPhages(host, person)" v-if="phage.fields && phage.fields['isPublished']" :key="phage.id" class="person-phagename _tag _margin-none _margin-right-half" >{{ phage.fields['Name'] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <div v-if="view == 'labs' " class="DirectoryView labs" >
      <!-- <div class="DirectoryView-view">
        <h3 v-if="search">Lab Search<span class="DirectoryView-search">: <span>{{ search }}</span></span></h3>
      </div> -->

      <!-- Empty search state -->
      <div v-if="getCounts.peopleCount == 0 && search" class="_section-content Directory-view-emptySearch">
        <h3>No results found for <span>{{ search }}</span> </h3>
      </div>

      <div class="DirectoryView-items" >

        <div class="DirectoryView-meta">
          <h4>Phage Hosts: {{ getHostCount(filterHost) }}, Labs: {{ getOrgCount(filterOrg) }}</h4>
        </div>
      
        <div v-for="org of getOrgs" v-if="filterOrg(org) && org.fields['isPublished']" :key="org.fields.Name" class="DirectoryView-item" >
          <div class="DirectoryView-head lab-org">
            <div class="DirectoryView-title lab-orgname">{{ org.fields.Name }}</div>
            <div v-if="org.fields.LongName" class="DirectoryView-title-desc lab-longname" >{{ org.fields.LongName }}</div>
            <div class="DirectoryView-info">{{ org.fields.Markdown }}</div>
          </div>
          <div class="DirectoryView-body lab-body">
            <div v-for="lab of getLabs(org)" v-if="lab.fields.isPublished" :key="lab.fields.Name" class="DirectoryView-subitem">
              <div class="DirectoryView-subtitle lab-name">{{ lab.fields.Name }}</div>
              <div class="DirectoryView-subcontent lab-people">
                <div v-for="person of getPerson(org)" v-if="person.fields['isPublished']" :key="person.fields.Name" class="DirectoryView-subcontent lab-person ">
                  <div class="person-info">
                    <div class="person-name">{{ person.fields.Name }}</div>
                    <div>
                      <span v-if="person.fields.PI" class="_tag _margin-none person-pi" >PI</span>
                      <span v-if="person.fields.Role" class="person-meta" >{{ person.fields.Role }}</span>
                      <span class="person-social">
                        <a v-if="person.fields.Twitter" :href="`https://twitter.com/${person.fields.Twitter}`" target="_blank" class="person-twitter" >@{{ person.fields.Twitter }}</a>
                        <a v-if="person.fields.GoogleScholar" :href="`${person.fields.GoogleScholar}`" target="_blank" class="person-gscholar" >GS</a>
                        <a v-if="person.fields.ORCID" :href="`https://orcid.org/${person.fields.ORCID}`" target="_blank" class="person-orcid" >ORCID</a>
                        <a v-if="person.fields.ResearchGate" :href="`${person.fields.ResearchGate}`" target="_blank" class="person-rgate" >RG</a>
                      </span>
                    </div>
                  </div>
                  <div class="person-phagehosts">
                    <div v-for="host of getHosts(person)" :key="host.fields.Name" class="DirectoryView-subcontent-item person-hosts ">
                      <div class="_organismName">{{ hostDisplayName(host) }}</div>

                      <!-- specific phages that someone owns -->
                      <div v-if="person.fields.Phages" class="person-phages" >
                        <span v-for="phage of getHostPersonPhages(host, person)" v-if="phage.fields && phage.fields['isPublished']" :key="phage.id" class="person-phagename _margin-none _margin-right-half" >{{ phage.fields['Name'] }}</span>
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


  </div>

</template>










<script>

// import { cytosis, deduplicate, sort, search, getFieldsOf } from '~/assets/helpers.js'
// import DirectoryView from '~/components/DirectoryView.vue'
import { mapState } from 'vuex'

export default {
  props: {
    'search': String,
    'view': String,
  },

  data: function () {
    return {
      ... this.$store.state.cytosis.tables,
      countResults: 0,
      labCount: 0,
    }
  },

  computed: {
    ...mapState([
        'HostGenus',
        'Organizations',
        'People',
        'Hosts',
        'Phages',
        'Labs',
        'HostFamily',
      ]),

    getOrgs() {
      // return search(this.search, this.Organizations, ['Name', 'LongName', 'Labs', 'People', 'Phage'], this.cytosis )
      return this.Organizations
    },

    getGenuses() {
      // return search(this.search, this.HostGenus, ['Name','Hosts','HostSpecies','TrivialName'], this.cytosis )
      return this.HostGenus // result
    },

    // pieces together all data counts
    getCounts() {
      let genuses = this.getGenuses
      let hostCount = 0
      let peopleCount = 0

      for (let genus of genuses) {
        let genusHosts = this.getFilteredHostsFromGenus(genus)
        if (genusHosts.length > 0) {
          hostCount += genusHosts.length
          for (let host of genusHosts) 
            peopleCount += host.fields.People.length
        }
      }
      return {hostCount, peopleCount}
      // return { genuses, hosts }
    }

  },

  methods: {
    getHostCount(filterFn) { // pass filter through, either for hosts or orgs
      let count = 0
      for (let genus of this.getGenuses) {
        for (let org of this.getHosts(genus)) {
          if(filterFn(org)) {
            count++
          }
        }
      }
      return count
    },

    getOrgCount(filterFn) { // pass filter through, either for hosts or orgs
      let count = 0
      for (let org of this.getOrgs) {
        if(filterFn(org)) {
          count++
        }
      }
      return count
    },

    getFields(recordArray, fieldName) {
      let results = []

      for (let record of recordArray) {
        if(record.fields && record.fields[fieldName])
          results.push(record.fields[fieldName])
      }
      return results
    },

    getLabs(org) {
      // instead of creating a Host > Lab link (more work), we look at the curators and their labs
      // not everyone has a lab though, so add those people to the end
      const people = this.$cytosis.getLinkedRecords(org.fields.People, this.People, true)
      let labArr = [], ppl = []
      for (let p of people) {
        if(p.fields.Labs)
          labArr = [...labArr, ...p.fields.Labs]
        else {
          p['isPerson'] = true
          // console.log('isPerson:', p)
          ppl.push(p)
        }
      }
      
      labArr = this.$cytosis.deduplicate(labArr) // dedup
      const labs = this.$cytosis.sort(this.$cytosis.getLinkedRecords(labArr, this.Labs, true))
      // sort labs first, then tack on the stragglers who don't have labs (if any)

      // console.log('getLabs; org, labs, ppl', org.fields.Name, labs, ppl)
      return [...labs, ...ppl]
    },
    getPerson(lab) {
      // search + filtering go in here, tbd
      const source = lab.fields.People 

      if(!source)
        return [lab] // 'lab' could actually also be a person

      return this.$cytosis.getLinkedRecords(source, this.People, true)
    },
    getLinkedOrgNames(obj) {
      // sort hosts by A>Z
      const orgs = this.$cytosis.sort(this.$cytosis.getLinkedRecords(obj.fields.Organization, this.Organizations, true))

      let name = [], longName = []
      for (let org of orgs ) {
        name.push(org.fields['Name'])

        if(org.fields['LongName'])
          longName.push(org.fields['LongName'])
      }

      // console.log('getLinkedOrgNames name, from:', name, obj.fields['Name'])
      return {'name': name.join(', '), 'longName': longName.join(', ')}
    },
    hostDisplayName(host) {
      // remove the * from display name (so it's Campylobacter instead of Campylobacter *)
      // but the * version still needs to show before its other hosts b/c it's encompassing
      // console.log('hostDisplayName host: ', host.fields.Name, host)
      if (host.fields.Name.indexOf('*') > 0)
        return host.fields.Name.substring(0, host.fields.Name.indexOf('*') - 1)
      return host.fields.Name
    },
    getHostPersonPhages(host, person) {

      const name = person.fields['Name']
      const hostPhages = this.$cytosis.getLinkedRecords(host.fields['Phages'], this.Phages, true) 
      let results = []
      // const hostPeopleIds = host.get('People')

      // for each phage, see if it has People by personName, if it does, add it to results
      for (const phage of hostPhages) {
        const phagePeople = this.$cytosis.getLinkedRecords(phage.fields['People'], this.People, true)
        if(this.$cytosis.search(name, phagePeople, ['Name'], this.cytosis ).length > 0)
          results.push(phage)
      }

      return results
    },

    getHosts(obj) {
      // sort hosts by A>Z
      const hosts = this.$cytosis.sort(this.$cytosis.getLinkedRecords(obj.fields.Hosts, this.Hosts, true))
      return hosts
    },







    getFilteredHostsFromGenus(genus) {
      const hosts = this.getHosts(genus)
      let filteredHosts = []

      for (let host of hosts) {
        if(this.filterHost(host)) {
          filteredHosts.push(host)
        }
      }
      return filteredHosts
    },

    filterHost(host) {
      if(!host.fields['People'])
        return false // no people or labs attached to some generated hosts

      const str = this.search.toLowerCase()

      if(str) {
        // match against Host name and People, and their orgs
        const people = this.$cytosis.getLinkedRecords(host.fields['People'], this.People, true)
        const hostName = host.fields['Name'].toLowerCase()
        const hostLabs = this.getLabs(host)

        if( hostName.includes(str) ||
            this.$cytosis.search(str, people, ['Name'], this.cytosis ).length > 0
          ) {
          // console.log('filterHost match 1:', str, host)
          return true
        }

        // match against Lab and Org name
        if(this.$cytosis.search(str, hostLabs, ['Name'], this.cytosis ).length > 0) {
          // console.log('filterHost match 2:', str, host)
          return true
        }

        // match against Org name
        const hostOrgs = this.$cytosis.getLinkedRecords(this.getFields(hostLabs, 'Organization'), this.Organizations, true) 
        if(this.$cytosis.search(str, hostOrgs, ['Name'], this.cytosis ).length > 0) {
          // console.log('filterHost match 3:', str, host)
          return true
        }

        // match against Long Name
        // const longName = hostOrgs.fields['LongName'] ? hostOrgs.fields['LongName'].toLowerCase() : ''
        if(this.$cytosis.search(str, hostOrgs, ['LongName'], this.cytosis ).length > 0) {
          // console.log('filterHost match 3:', str, host)
          return true
        }

        // match against phage names (a host's people's phages)
        for (const person of people) {
          const curatorPhages = this.getHostPersonPhages(host, person)
          if(this.$cytosis.search(str, curatorPhages, ['Name'], this.cytosis ).length > 0) {
            // console.log('filterHost match 4:', str, host, this.$cytosis.search(str, curatorPhages, ['Name'], this.cytosis ))
            return true
          }
        }
        return false
      }
      // console.log('filterHost no search:', str, host)
      return true
    },








    // works for organization OR labs
    filterOrg(org) {
      if( (!org.fields['People'] && !org.fields['Labs']) || !org.fields['isPublished'])
        return false // no people or labs attached to some orgs

      const str = this.search.toLowerCase()

      if(str) {

        // if given a lab, set to the lab's org (all labs have orgs)
        if (this.$cytosis.getLinkedRecords(org.fields['Organization'], this.getOrgs, true)[0])
          org = this.$cytosis.getLinkedRecords(org.fields['Organization'], this.getOrgs, true)[0]

        // match against Host name and People
        const orgName = org.fields['Name'].toLowerCase()
        const longName = org.fields['LongName'] ? org.fields['LongName'].toLowerCase() : ''
        const people = this.$cytosis.getLinkedRecords(org.fields['People'], this.People, true)
        const labs = this.$cytosis.getLinkedRecords(org.fields['Labs'], this.Labs, true)

        if( orgName.includes(str) ||
            longName.includes(str) ||
            this.$cytosis.search(str, people, ['Name'], this.cytosis ).length > 0 ||
            this.$cytosis.search(str, labs, ['Name'], this.cytosis ).length > 0 || 
            this.$cytosis.search(str, people, ['Name'], this.cytosis ).length > 0
          ) {
          // console.log('filterHost direct match:', str)
          return true
        }

        // match through each person's Host names
        for (const person of people) {
          // console.log('person:',person)
          // const hosts = person.get('Hosts')
          const hosts = this.$cytosis.getLinkedRecords(person.fields['Hosts'], this.Hosts, true)
          if (this.$cytosis.search(str, hosts, ['Name'], this.cytosis ).length > 0) {
            return true
          }

          // match against phage names (a host's people's phages)
          for (const host of hosts) {
            const curatorPhages = this.getHostPersonPhages(host, person)
            // console.log('host phage person name match:', curatorPhages)
            if(this.$cytosis.search(str, curatorPhages, ['Name'], this.cytosis ).length > 0)
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


