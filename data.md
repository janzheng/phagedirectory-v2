

### Data Importer 

- All of this done w/ a LOCAL scrubber don't go React yet
- Scrub email ("Username")
- Keep timestamp
- A lot of the data needs to be manually edited and combed, even with an importer
  - output to stringified json
  - reactive, live data preview
  - easily export current site data
  - easily mix current site data w/ new csv data
  - make data uniform
  - other data points like notes, hide, etc.
  - internal data view (w/ emails, notes, etc.)
  - export data view - only public stuff
  - "disable" button from exported data view
  - easy copy/paste from exported data into a new js variable
  - when copying new CSVs smart enough to not overwrite changes (look at timestamp+username collision)
  - detect and warn if email addresses exist in export

### Data Loader

- Auto de-duplicator


"Timestamp","Username","Full Name","Role or Position","Organization","Principal Investigator","Twitter Handle","Scholar Profiles","Bacterial pathogens for which you could provide phages"
"2017/11/18 2:53:55 AM EST","ansaldi@imm.cnrs.fr","Mireille Ansaldi","PI phage research group ","CNRS","","@MireilleLCB","","E. coli Salmonella enterica"
"2017/11/18 4:14:15 AM EST","anne.chevallereau@gmail.com","Dr. Anne Chevallereau","Postdoctoral fellow","University of Exeter ","Dr Edze Westra","","","Pseudomonas aeruginosa "
"2017/11/18 11:58:52 AM EST","marynmckenna@gmail.com","Maryn McKenna","science journalist","Wired, National Geographic, Mother Jones","n/a","@marynmck","","n/a"
"2017/11/18 12:20:45 PM EST","katrine@uci.edu","Katrine Whiteson","Assistant Professor","University of California, Berkeley","@KatrineWhiteson","@KatrineWhiteson","","Enterococcus, Pseudomonas, Stenotrophomonas (maybe), E coli, Streptococcus, Rothia"
"2017/11/18 7:49:44 PM EST","h.hendrickson@massey.ac.nz","Dr Heather Hendrickson ","Assistant Prof. (Senior Lecturer, NZ) ","Massey University ","Dr Heather Hendrickson ","@DrHHNZ","https://orcid.org/0000-0003-3471-4397
https://scholar.google.co.nz/citations?user=PKkcGsAAAAAJ&hl=en","Pseudomonas fluorescens, Mycobacterium smegmatis, "
"2017/11/19 12:55:22 AM EST","rachit@iisc.ac.in","Rachit Agarwal","Assistant Professor","Indian Institute of Science, Bangalore, India","Rachit Agarwal","@Rachit_Agarwal","https://scholar.google.com/citations?user=70JHIQMAAAAJ&hl=en","Establishing a new lab. Hoping to procure Mycobacterium phages"
"2017/11/19 4:24:16 AM EST","mikael.skurnik@helsinki.fi","Dr. Mikael Skurnik","Professor","University of Helsinki","Mikael Skurnik @SkurnikMikael","@SkurnikMikael","0000-0001-8791-9260","Staphlyococcus aureus, Enterococcus faecium, Yersinia enterocolitica, Yersinia pseudotuberculosis, Yersinia pesits, Klebsiella pneumoniae, Escherichia coli, Pseudomonas aeruginosa, Enterobacter cloacae"
"2017/11/19 12:57:38 PM EST","rcitorik@gmail.com","Robert Citorik","Graduate Student","MIT","Timothy Lu","@rcitorik","","Klebsiella pneumoniae, Escherichia coli, Enterobacter cloacae"
"2017/11/19 2:50:58 PM EST","stephen.stockdale@teagasc.ie","Dr. Stephen Stockdale","Postdoctoral Fellow","Teagasc Agricultural and Food Development Authority","","@SteveStockyPhD","","Staphylococcus aureus"
"2017/11/20 5:08:05 AM EST","gregory.resch@unil.ch","Dr. Grégory Resch","Project Director","University of Lausanne","Grégory Resch","","","E. coli, P. aeruginosa, A. baumannii, K. pneumoniae, S. aureus."








