
/*
      INSTUTITUIONS

      - universities, hospitals, institutes

      - org-id (all org-id must be unique!!!)
      - name (Univeristy of California San Diego)
      - abbr (ex UCSD)
      - website URL
      - location (address)
      - image URL

      - sub (labs, sub-locations)
        - name
        - principal (might not have an account here)
        - abbr
        - website
        - location
        - image URL
        - social
          - twitter
          - email
          - url

*/



const organizations = [
  {
    id: '',
    name: '',
    abbr: '',
    url: '',
    location: '',
    image: '',
    sub: [
      {
        name: '',
        abbr: '',
        url: '',
        location: '',
        image: '',
        social: {
          twitter: '',
          email: '',
          url: '',
        }
      }
    ]
  },


  {
    id:   'org-ucsd',
    name: 'University of California, San Diego',
    abbr: 'UCSD',
    url: 'http://ucsd.edu',
    location: 'La Jolla, CA',
    image: '',
    sub: [
      {
        name: 'Department of Medicine',
        abbr: '',
        url: '',
        location: '',
        image: '',
        social: {
          twitter: '',
        }
      },
      {
        id:   'org-ucsd-bio',
        name: 'Department of Biology'
      },
      {
        id:   'org-ucsd-patho',
        name: 'Department of Pathology'
      },
      {
        id:   'org-ucsd-ped',
        name: 'Department of Pediatrics'
      },
      {
        id:   'org-ucsd-skaggs',
        name: 'Skaggs School of Pharmacy & Pharmaceutical Sciences'
      },
      {
        id:   'org-ucsd-radio',
        name: 'Department of Radiology'
      }
    ]
  },

  {
    id:   'org-nmrc',
    name: 'Naval Medical Research Center',
    abbr: 'NMRC',
    url: 'www.nmrc.navy.mil/',
    location: 'Frederick, MD',
    sub: [
      {
        id:   'org-nmrc-bdrd',
        name: 'Biological Defense Research Directorate',
      }, 
      {
        id:   'org-nmrc-regen',
        name: 'Department of Regenerative Medicine',
        sub: [
          {
            name: 'Advanced Surgical Imaging Program'
          }
        ]
      }
    ]
  },

  {
    id:   'org-biodefense',
    name: 'National Biodefense Analysis and Countermeasures Center',
    abbr: '',
    url: '',
    location: 'Frederick, MD',
    sub: [
      {
        id:   'org-biodefense-radio',
        name: 'Biological Defense Research Directorate',
      }
    ]
  },

  {
    id:   'org-harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    sub: [
      {
        id:   'org-harvard-law',
        name: 'Petrie-Flom Center for Health Law Policy, Biotechnology and Bioethics',
      }
    ]
  },

  {
    id:   'org-henryjackson',
    name: 'Henry M. Jackson Foundation',
    location: 'Bethesda, MD',
  },

  {
    id:   'org-texasam',
    name: 'Texas A&M',
    location: 'College Station, TX',
    sub: [
      {
        id:   'org-texasam-animal',
        name: 'Department of Animal Science',
      },
      {
        id:   'org-texasam-phagetech',
        name: 'Center for Bacteriophage Technology',
      },
      {
        id:   'org-texasam-agrilife',
        name: 'Texas A&M AgriLife Research',
      },
      {
        id:   'org-texasam-biochem',
        name: 'Department of Biochemistry and Biophysics',
      }
    ]
  },

  {
    id:   'org-monash',
    name: 'Monash University',
    location: 'Melbourne, Australia',
    sub: [
      {
        id:   'org-monash-bio',
        name: 'School of Biological Sciences'
      }
    ]
  },

  {
    id:   'org-ampliphi',
    name: 'AmpliPhi Biosciences',
    location: 'San Diego, CA',
  },

  {
    id:   'org-osu',
    name: 'Ohio State University',
    abbr: 'OSU',
  },

  {
    id:   'org-leuven',
    name: 'KU Leuven',
    location: 'Leuven, Belgium',
  },

  {
    id:   'org-vandy',
    name: 'Vanderbilt University',
    location: 'Nashville, TN',
  },

  {
    id:   'org-leicester',
    name: 'University of Leicester',
    location: 'Leicester, England',
  },

  {
    id:   'org-guelph',
    name: 'University of Guelph',
    location: 'Guelph, Canada',
  },

  {
    id:   'org-evergreen',
    name: 'Evergreen State College',
    location: 'Olympia, WA',
  },

  {
    id:   'org-laval',
    name: 'Université Laval',
    location: 'Quebec City, Québec',
  },

  {
    id:   'org-pasteur',
    name: 'Pasteur Institute',
    location: 'Paris, France',
  },

  {
    id:   'org-uhelsinki',
    name: 'University of Helsinki',
    location: 'Helsinki, Denmark',
  },
  
  {
    id:   'org-uga',
    name: 'University of Georgia',
    abbr: 'UGA',
    location: 'Athens, GA',
    sub: [
      {
        id:   'org-uga-ccrc',
        name: 'Complex Carbohydrate Research Center',
        abbr: 'CCRC',
      }
    ]
  },

  {
    id:   'org-alberta',
    name: 'University of Alberta',
    location: 'Alberta, Canada',
  },

  {
    id:   'org-nottingham',
    name: 'University of Nottingham',
    location: 'Nottingham, England',
  },



]






