
/*

    eventually phages will probably have their own DB but don't get ahead of yourself

    PROFILES
    - people

    - name
    - role
    - image URL
    - location (city, state)

    - contact
      - website URL
      - Google Scholar
      - Twitter
      - email
      - researchgate
      - orcid

    - institutions
      - name OR (org-id) / sub-lab
      - role
        - principal investigator
        - (any other roles or is ^ the only one?)

    - phages (act as a tag; inferred data src)
      - name (ex: Campylobacter)
      - short desc (Campylobacter jejuni phages (group II and group III myoviridae, ~10 lytic phages))

*/

const roles = {
  prof: 'Professor',
  asstprof: 'Assistant Professor',
  candidate: 'PhD Candidate',
}

const profiles = [
  {
    name: 'Jessica Sacher',
    // username: 'jessicasacher', // eventually can get profile pages; placeholder for now
    role: '', // temporarily a string; roles.candidate,
    // location: 'Athens, GA',
    image: '',
    profiles: {
      url: '',
      twitter: '@jessicasacher',
      scholar: 'http://scholar.google.com/citations?user=r3PIVU8AAAAJ&hl=en',
      // email: 'sacher@ualberta.com', // hidden from public
      researchgate: 'http://researchgate.net/profile/Jessica_Sacher',
      orcid: '0000-0003-0297-9550',
    },
    org: '', // simple version
    orgs: [
      {
        orgId: 'org-alberta',  // orgId takes precedence; one or the other
        name: '',   // name is fall-back
      },
      {
        orgId: 'org-ccrc',  // UGA CCRC
        name: 'Complex Carbohydrate Research Center',   
      }
    ],
    phages: [ 'Campylobacter'
      // { // future: 
      //   name: 'Campylobacter', // taggable name; needs to be cleaned
      //   desc: 'Campylobacter jejuni phages (group II and group III myoviridae, ~10 lytic phages)',
      // },
    ],
    system: {
      published: true,
      notes: '',
    }
  },

]






