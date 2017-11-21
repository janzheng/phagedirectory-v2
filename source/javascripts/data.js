
// basic data source
// this is EDITED from the raw CSV!
// make sure you MERGE DATA

var data = {
   "raw": [
      {
         "timestamp": "2017/11/18 2:53:55 AM EST",
         "name": "Mireille Ansaldi",
         "role": "Principal Investigator",
         "org": "Centre national de la recherche scientifique",
         "orgs": [
            {
               "name": "Centre national de la recherche scientifique",
               "abbr": "CNRS"
            }
         ],
         "pi": "",
         "profiles": {
            "twitter": "@MireilleLCB",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Escherichia coli",
            " Salmonella enterica"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/18 4:14:15 AM EST",
         "name": "Dr. Anne Chevallereau",
         "role": "Postdoctoral fellow",
         "org": "University of Exeter ",
         "pi": "Dr Edze Westra",
         "profiles": {
            "twitter": "",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas aeruginosa "
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/18 11:58:52 AM EST",
         "name": "Maryn McKenna",
         "role": "science journalist",
         "org": "Wired, National Geographic, Mother Jones",
         "pi": "n/a",
         "profiles": {
            "twitter": "@marynmck",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "n/a"
         ],
         "system": {
            "published": false,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/18 12:20:45 PM EST",
         "name": "Katrine Whiteson",
         "role": "Assistant Professor",
         "org": "University of California, Berkeley",
         "pi": "Katrine Whiteson",
         "profiles": {
            "twitter": "@KatrineWhiteson",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Enterococcus",
            " Pseudomonas",
            " Stenotrophomonas (maybe)",
            " Escherichia coli",
            " Streptococcus",
            " Rothia"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/18 7:49:44 PM EST",
         "name": "Dr. Heather Hendrickson ",
         "role": "Assistant Prof. (Senior Lecturer, NZ) ",
         "org": "Massey University ",
         "pi": "Dr. Heather Hendrickson",
         "profiles": {
            "twitter": "@DrHHNZ",
            "scholar": "https://scholar.google.co.nz/citations?user=PKkcGsAAAAAJ&hl=en",
            "orcid": "0000-0003-3471-4397",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas fluorescens",
            " Mycobacterium smegmatis"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/19 12:55:22 AM EST",
         "name": "Rachit Agarwal",
         "role": "Assistant Professor",
         "org": "Indian Institute of Science, Bangalore, India",
         "pi": "Rachit Agarwal",
         "profiles": {
            "twitter": "@Rachit_Agarwal",
            "scholar": "https://scholar.google.com/citations?user=70JHIQMAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Establishing a new lab. Hoping to procure Mycobacterium phages"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/19 4:24:16 AM EST",
         "name": "Dr. Mikael Skurnik",
         "role": "Professor",
         "org": "University of Helsinki",
         "pi": "Mikael Skurnik",
         "profiles": {
            "twitter": "@SkurnikMikael",
            "scholar": "0000-0001-8791-9260",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Staphlyococcus aureus",
            " Enterococcus faecium",
            " Yersinia enterocolitica",
            " Yersinia pseudotuberculosis",
            " Yersinia pesits",
            " Klebsiella pneumoniae",
            " Escherichia coli",
            " Pseudomonas aeruginosa",
            " Enterobacter cloacae"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/19 12:57:38 PM EST",
         "name": "Robert Citorik",
         "role": "Graduate Student",
         "org": "MIT",
         "pi": "Timothy Lu",
         "profiles": {
            "twitter": "@rcitorik",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Klebsiella pneumoniae",
            "Escherichia coli",
            "Enterobacter cloacae"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/19 2:50:58 PM EST",
         "name": "Dr. Stephen Stockdale",
         "role": "Postdoctoral Fellow",
         "org": "Teagasc Agricultural and Food Development Authority",
         "pi": "",
         "profiles": {
            "twitter": "@SteveStockyPhD",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Staphylococcus aureus"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/20 5:08:05 AM EST",
         "name": "Dr. Grégory Resch",
         "role": "Project Director",
         "org": "University of Lausanne",
         "pi": "Dr. Grégory Resch",
         "profiles": {
            "twitter": "",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Escherichia coli",
            " Pseudomonas aeruginosa",
            " Acinetobacter baumannii",
            " Klebsiella pneumoniae",
            " Staphylococcus aureus"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/20 11:49:25 AM EST",
         "name": "Dr Mohammad Alhawi",
         "role": "Assistant professor",
         "org": "University of Jeddah",
         "pi": "",
         "profiles": {
            "twitter": "@mbahawi",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Non"
         ],
         "system": {
            "published": false,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/20 9:18:26 PM EST",
         "name": "Jeremy Barr",
         "role": "Lecturer & Group Leader",
         "org": "Monash University",
         "pi": "",
         "profiles": {
            "twitter": "@JeremyJBarr",
            "scholar": "https://scholar.google.com.au/citations?user=Ebx3KmEAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Acinetobacter baumannii",
            " Enterobacteriaceae",
            " Staphylococcus aureus"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/21 12:35:28 AM EST",
         "name": "Jessica Sacher",
         "role": "Graduate student",
         "org": "University of Alberta, University of Georgia",
         "pi": "Dr. Christine Szymanski",
         "profiles": {
            "twitter": "@JessicaSacher",
            "scholar": "https://scholar.google.com/citations?user=r3PIVU8AAAAJ&hl=en",
            "orcid": "0000-0003-0297-9550",
            "researchgate": "https://www.researchgate.net/profile/Jessica_Sacher"
         },
         "phages": [
            "Campylobacter jejuni"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/21 6:04:34 AM EST",
         "name": "Deyvid Amgarten",
         "role": "PhD Student",
         "org": "University of Sao Paulo",
         "pi": "Aline Maria da Silva",
         "profiles": {
            "twitter": "",
            "scholar": "https://scholar.google.com.br/citations?user=g7_AAFEAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas aeruginosa"
         ],
         "system": {
            "published": true,
            "notes": "",
         }
      }
   ]
}














