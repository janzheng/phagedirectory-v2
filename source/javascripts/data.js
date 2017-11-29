
// basic data source
// this is EDITED from the raw CSV!
// make sure you MERGE DATA

var data = {
   "raw": [
      {
         "timestamp": "Timestamp",
         "name": "Full Name",
         "role": "Role or Position",
         "org": "Organization",
         "pi": "Principal Investigator",
         "profiles": {
            "twitter": "Twitter Handle",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Bacterial pathogens for which you could provide phages"
         ],
         "system": {
            "published": false,
            "notes": "",
            "profile_str": "Scholar Profiles"
         }
      },
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
            "Salmonella enterica"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/18 4:14:15 AM EST",
         "name": "Dr. Anne Chevallereau",
         "role": "Postdoctoral Fellow",
         "org": "University of Exeter ",
         "pi": "Dr Edze Westra",
         "profiles": {
            "twitter": "",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas aeruginosa"
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
            "Pseudomonas",
            "Stenotrophomonas",
            "Escherichia coli",
            "Streptococcus",
            "Rothia"
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
         "org": "Massey University",
         "pi": "Dr. Heather Hendrickson",
         "profiles": {
            "twitter": "@DrHHNZ",
            "scholar": "https://scholar.google.co.nz/citations?user=PKkcGsAAAAAJ&hl=en",
            "orcid": "0000-0003-3471-4397",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas fluorescens",
            "Mycobacterium smegmatis"
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
         "org": "Indian Institute of Science",
         "location": "Bangalore, India",
         "pi": "Rachit Agarwal",
         "profiles": {
            "twitter": "@Rachit_Agarwal",
            "scholar": "https://scholar.google.com/citations?user=70JHIQMAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Mycobacterium"
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
            "Staphylococcus aureus",
            "Enterococcus faecium",
            "Yersinia enterocolitica",
            "Yersinia pseudotuberculosis",
            "Yersinia pestis",
            "Klebsiella pneumoniae",
            "Escherichia coli",
            "Pseudomonas aeruginosa",
            "Enterobacter cloacae"
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
            "Pseudomonas aeruginosa",
            "Acinetobacter baumannii",
            "Klebsiella pneumoniae",
            "Staphylococcus aureus"
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
            "Enterobacteriaceae",
            "Staphylococcus aureus"
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
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/21 3:35:39 PM EST",
         "name": "John Dennehy",
         "role": "Principal Investigator",
         "org": "Queens College, CUNY",
         "pi": "John Dennehy ",
         "profiles": {
            "twitter": "@DrJDennehy",
            "scholar": "https://scholar.google.com/citations?user=xHV6zmQAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas aeruginosa",
            "Mycobacterium tuberculosis",
            "Klebsiella pneumoniae",
            "Enterococcus fecium"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/21 3:37:59 PM EST",
         "name": "Hisham Alrubaye",
         "role": "Researcher",
         "org": "Queens College, CUNY",
         "pi": "John Dennehy",
         "profiles": {
            "twitter": "@phage4future",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Burkholderia cepacia",
            "Pseudomonas aeruginosa",
            "Escherichia coli (uropathogenic)",
            "Listeria"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/22 7:57:08 AM EST",
         "name": "Dr. Kristin Parent",
         "role": "Assistant Professor",
         "org": "Michigan State University ",
         "pi": "@Phage4lyfe",
         "profiles": {
            "twitter": "@Phage4lyfe",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Shigella",
            "Salmonella",
            "Escherichia coli"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/25 9:38:34 PM EST",
         "name": "Janis Doss",
         "role": "Ph.D. Candidate",
         "org": "Old Dominion University",
         "pi": "David Gauthier",
         "profiles": {
            "twitter": "@Janis0616",
            "scholar": "",
            "orcid": "",
            "researchgate": "http://www.researchgate.net/profile/janis_doss"
         },
         "phages": [
            "Mycobacterium marinum",
            "Mycobacterium fortuitum",
            "Mycobacterium chelonae"
         ],
         "system": {
            "published": true,
            "notes": "",
            "profile_str": "www.linkedin.com/in/janisdoss/ "
         }
      },
      {
         "timestamp": "2017/11/24 3:08:47 PM EST",
         "name": "Daria Van Tyne",
         "role": "Postdoctoral Fellow",
         "org": "Harvard Medical School",
         "pi": "",
         "profiles": {
            "twitter": "@DariaVanTyne",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Enterococcus faecalis"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/27 7:49:36 PM EST",
         "name": "Sarah Doore",
         "role": "Postdoctoral Fellow",
         "org": "Michigan State University",
         "pi": "Kristin Parent (@phage4lyfe)",
         "profiles": {
            "twitter": "@virus_husbandry",
            "scholar": "",
            "orcid": "0000-0002-7672-2355",
            "researchgate": ""
         },
         "phages": [
            "Shigella species",
            "Citrobacter freundii"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/28 12:45:00 AM EST",
         "name": "Rob Edwards",
         "role": "Professor",
         "org": "San Diego State University",
         "pi": "Me",
         "profiles": {
            "twitter": "@linsalrob",
            "scholar": "https://scholar.google.com/citations?user=e7fvl1kAAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Acinetobacter",
            "Bacteroides",
            "Clostridium",
            "Collinsella",
            "Dorea",
            "Enterococcus",
            "Parabacteroides",
            "Ruminococcaceae"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/28 12:00:54 PM EST",
         "name": "James Gurney",
         "role": "Postdoctoral Fellow",
         "org": "Georgia Institute of Technology",
         "pi": "Sam Brown",
         "profiles": {
            "twitter": "@jamesrgurney",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Pseudomonas aeruginosa"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/28 1:37:15 PM EST",
         "name": "Joseph Kreitz",
         "role": "Undergraduate",
         "org": "Duke University",
         "pi": "Lingchong You",
         "profiles": {
            "twitter": "",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Burkholderia cepacia"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/24 8:25:03 PM EST",
         "name": "Daria Van Tyne",
         "role": "Postdoc",
         "org": "Harvard Medical School",
         "pi": "Michael Gilmore",
         "profiles": {
            "twitter": "@DariaVanTyne",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Enterococcus"
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/29 12:45:18 AM EST",
         "name": "Randall DeJong",
         "role": "Professor",
         "org": "Calvin College",
         "pi": "",
         "profiles": {
            "twitter": "@RandallJDeJong",
            "scholar": "",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Mycobacterium smegmatis",
            "Gordonia terrae",
            "Agrococcus sp.",
            "Citrobacter sp.",
            "Enterobacter sp."
         ],
         "system": {
            "published": true,
            "notes": ""
         }
      },
      {
         "timestamp": "2017/11/29 9:21:13 AM EST",
         "name": "Abbas Soleimani Delfan",
         "role": "Graduate Student",
         "org": "University of Isfahan",
         "pi": "",
         "profiles": {
            "twitter": "",
            "scholar": "https://scholar.google.com/citations?user=O2ALfG4AAAAJ&hl=en",
            "orcid": "",
            "researchgate": ""
         },
         "phages": [
            "Escherichia coli",
            "Klebsiella pneumoniae",
            "Klebsiella oxytoca",
            "Enterococcus faecalis",
            "Pseudomonas aeruginosa"
         ],
         "system": {
            "published": true,
            "notes": "",
         }
      },
      {
         "timestamp": "2017/11/29 10:19:46 AM EST",
         "name": "Adriana Hernandez",
         "role": "Ph.D Candidate",
         "org": "Texas A&M University | Center for Phage Technology",
         "pi": "Ryland Young",
         "profiles": {
            "twitter": "@adricarosmile",
            "scholar": "",
            "orcid": "",
            "researchgate": "https://www.researchgate.net/profile/Adriana_Carolina_Hernandez2"
         },
         "phages": [
            "Klebsiella pneumoniae",
            "Acinetobacter baumannii",
            "Citrobacter freundii"
         ],
         "system": {
            "published": true,
            "notes": "",
            "profile_str": ""
         }
      },
   ]
}






