notes.md


# Phage Directory v3


## Todo
- Transition to Nuxt 2, babel 7 and IE11 support

### Instill
- warning message for non es5
  - SSR helps
- updates intro
- join, routes, copy, forms, and intro
  - also strategy
- BLOG POST: our goals, roadmap, how we're getting to phage therapy
  - tone down the scare factor, tone up the science-backed factor, supporting research for phage therapy
- SEARCH: exclude non-searched labs
- Add all media links to airtable for the news section
  - need to pick and choose
- add human-led channels
  - jessica’s face on capsid, plus name and instill account 

### Instill
- profiles
- share/chat


--- 

## Later

- Rename, combine news + updates with 'Instill' branding
  - news suggestion box (use sidebar as inspiration)
    - twitter, email, link, title, text
- switch header search to content search across all of phage directory, including media



## Planning

- Structure
  - Home
  - Alerts
    - alert service
    - all the tiny letter alerts should be written here, along with sent out through twitter, email, etc.
    - 'alerts/:slug'
  - Join '/join'
    - Options to 'join the fight'
    - as researchers, doctors, or public
    - '/join/public'
      - for public education and newsletter
    - '/join/therapy' / Join/doctors
      - Information for doctors, how they can use
      - Directory of doctors that are interested in phage therapy / party of phage directory network
      - Also info for nurses, etc. but geared towards ID and family doctors
    - '/join/research'
      - for labs with phages
      - add phage form
  - Newsletter (capsid and tail)
  - Site Policies '/policies'
  - Directory '/' 
    - the entry points should be the main site; if that's impossible then
      use something like '/main'
    - Phages '/phages'
      - directory filtered by phages
    - Hosts (phage hosts) '/hosts'
      - directory filtered by phage hosts, bacteria
    - Diseases '/diseases'
      - infectious disease profile and news
      - relationship with hosts, and phages
    - Antibiotics '/antibiotics'
      - list of antibiotics and resistance;
      - what phages can interact w/ hosts for this antibiotic
    - Organizations (orgs) '/orgs'
    - Labs '/labs'
      - subset of organizations
    - People '/people'
  - Terms / Glossary / Definitions
    - definitions, explanations
  - Feedback
    - specifically set up for the drop cards about ideas
  - Ask
    - *** superceded by drift
    - ask us questions? / post a question etc.


## Done

- add ATLX forms thing to Feedback page
- add Webtask system for sending feedback into PhDir Input; secure layer webtask/phdir-input
- create a writer@zeee.co account to write to the input (just cytosis@zeee.co)
- added webtask to mailgun feedback / contact updates
- added mini browse/search
- phage/labs/orgs etc. browse page + search page
- phage system (replicate current)
- added dynamic form (Form component) so forms can be spun up and down very easily, and written to airtable
- Dynamic forms
  - ensure radio and checkboxes all work
  - form component version
- policy page
- Policy: - cancellation / change info
  - Join - cancellation / change info details
- figured out IE11 — markdown-it-attrs and moment are not compliant
  - moment switched out with dayjs
  - updating markdown-it-attrs w/ new babel


