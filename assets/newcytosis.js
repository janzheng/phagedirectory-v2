

// /*

//   Cytosis CMS (cytosis)

//     - Airtable-centric Light CMS
//     - static content cms transportation system + protocol

//     Airtable is currently used as the only data storing tool
//     - in the future localhost and mLab/mongo will also be used
//       - for offline access
//       - for multiple devices
//     - so in the future some of these should be separated

//   Future / roadmap
//     - use simple functions
//       - Create
//       - Read
//       - Update
//       - Delete

//     - cytosis controller table
//       - can use this to variably set other table names w/o hard coding
//     - front-end wrapper
//       - jquery, non-vue getter
//         - maybe extend jquery prototype?
//       - public API key
//       - extensible version of the atlx experiment
//     - keepAlive syncing / polling w/ airtable (not fully reactive like Meteor 
//       - but can sync+cache at 5 ticks/sec
//       - webtask can sync/cache at 1 tick/sec
    
//     - cytosis webtask (for public interfaces)
// */



// /*
  
//   "Docs"


//   - Starting - 

//     Cytosis is for using airtable as a prototype CMS
//     Core user data is best not stored using this system. Use something like auth0 instead.

//     Private Use *** use sparingly
//       - passworded sites and local apps can hardcode the API key (airtableApiKey) directly in cytosis
//       - KEEP IN MIND that cytosis code is visible, and anyone can edit your tables if that's what you want
//       - One way to guard against this is for users to enter their airtable API key and Base ID manually

//     Public Use
//       - sometimes you want to display content from airtable (as a CMS)
//       - Create a separate user with view-only access, and use its API key as the API key
//         - The key is used the exact same way as a regular key, except create/update/delete will throw errors 
//       - Ex: Website content, blog content, news articles, lists or browsable data like bookmarks or store data

//     Private/Public Use
//       - Any sites w/ functionality to update Airtable as well as read from Airtable for the masses
//       - If there's a login system, you can create a handler that retrieves a user's private API key and load it into their system
//         - the privateKeyHandler is just a convenient place to store the serverless URL that retrieves this data
//       - Semi-private: Todo lists, shopping lists — apps that run on a public machine, but users have edit access to their own repo
//         - Retrieve the private API key from a server or external system after login
//       - Public-private: Feedback forms, rating systems, commenting systems, interactive projects — users can all edit the same data repository will require an external server handler
//         - Use a public API for read, and process create/update/delete requests via an external handler

//     // init Cytosis
//     const cytosis = new Cytosis({
//       airtableApiKey: 'key value' — SECRET! and is for editing the tables
//       airtableApiHandler: 'url' — returns the private API key for a user — url to a serverless/lambda function like Glitch or Webtask
//       airtableBase: {
//         id: 'Airtable Base ID key', 
//         tables: [array of table names]} — optional; can use .initConfig instead to load from _cytosis table, but requires a _cytosis table w/ a column called Items w/ multiple select
//         dataHandler: 'url' — TBD — offloads all this work to a third party like Webtask or Glitch
//     })

//     // cytosis.initConfig() 
//     // loads tables from _cytosis table instead of hard-coded
//     // create a row w/ Name="tableNames" and a Multiple Select with the table names


//   - Usage -

//     cytosis.get('recordId')
//     // returns a promise of data of a single record
//     // useful when you have an array of recordIds

//     cytosis.getTables(options={}, tables=this.airtableBase.tables)
//     // returns a promise of data of a single record
//     // {options} are: view, fields, sort, filter, per the airtable API
//     // [tables] is an array of table names (default is to retrieve whatever has been initiated)

//     cytosis.save(object, tableName, recordId=undefined)
//     // {object} is the object you want saved. Fields must match those of the table or not be defined
//     // 'tableName' is the name of the table you're saving your object to
//     // 'recordId' lets you update an existing record. Unfortunately you still have to supply the tableName per the API

//     cytosis.delete(tableName, recordId)
//     // 'tableName' is the name of the table to delete your object from. API requires you to state tableName
//     // 'recordId' is the record to be deleted. 

//   - Helpers -

//     cytosis.getLinkedRecords(recordIds, linkedTable, getObj=false)
//     // airtable excels at creating links between records. These links are stored as arrays of recordIds
//     // this converts the linked records to an array of Names (for Tags this is sufficient)
//     // if you need the entire objects, set getObj to true
//     // [recordIds] is an array of links (e.g. a list of tag references to the Tags table)
//     // 'linkedTable' is the table name e.g. 'Tags' where the records are stored

//     cytosis.split(saveObject, key, maxChunks=4)
//     // this one splits huge objects (stringified > 100,000 chars) across multiple columns
//     // e.g. an object to be stored in key _data gets split into _data _data-1 _data-2
//     // the table needs to have those extra columns created in airtable, so this requires some planning 
//     // {saveObject} is the object you want to store
//     // 'key' is something like _data 

//     cytosis.unsplit(record, key)
//     // {record} is the actual record object from airtable (not a record Id)
//     // 'key' is the what you want to unsplit (e.g. '_data' from the above example)


// */

// import * as Airtable from 'airtable'
// // import { debug } from '@/helpers'
// // import smartypants from 'smartypants'
// // var assert = require('assert'); // should use npm assert if making this a real npm module



// // might need to track internal system status
// // const STATUS = {
// //   LOADING: 'LOADING',
// //   READY: 'READY',
// //   ERROR: 'ERROR',
// // }

// // temporary
// // const debug = function(nameObj,...logs) {
// //   let name = nameObj.name ? nameObj.name : nameObj // could be a component object
// //   const evt = new CustomEvent('debug', {detail: { name, logs: {...logs} }})
// //   window.dispatchEvent(evt)
// // }


// let Cytosis = {
//   init: function(opts) {

//     opts = opts || {};

//     // private api key 
//     this.airtableApiKey = opts.airtableApiKey || Cytosis.airtableApiKey

//     // base + tables
//     // {id: '123', tables: ['Faves','Tags','Collections']}
//     // the first table is required and is considered the primary table; the other ones are linked tables
//     this.airtableBase = opts.airtableBase || Cytosis.airtableBase           // base and table informa
//     // assert(this._apiKey, 'API key is required to connect to Airtable');
    
//     Airtable.configure({
//       endpointUrl: `https://api.airtable.com`,
//       apiKey: this.airtableApiKey
//     })

//     this.base = this.getBase()

//     // console.log('Cytosis is ON')
//   },

//   initConfig: function() {
//     // dynamically init tables for airtableBase if they haven't been set
//     // from the _cytosis tab
//     const _this = this
//     return new Promise(function(resolve, reject) {

//       _this.getTables({}, ['_cytosis']).then( (_config) => {
//         if(_config) {
//           _this['data'] = _config

//           // init tables from config if they don't exist
//           if ( !_this.airtableBase.tables ) {
//             for(let config of _config._cytosis) {
//               if (config.fields.Name == 'tableNames' && config.fields.Items) {
//                 _this.airtableBase.tables = config.fields.Items
//               }
//             }
//           }
//         }
//         // console.log('Cytosis tables: ', _this.airtableBase, _this.airtableBase.tables)
//         // return the initiated cytosis object on completion
//         resolve(_this)
//       })

//     })
//   },


//   // retrieve a single record from the base, from all stored tables
//   getRecord: function(recordId) {
//     const base = this.getBase()
//     const tables = this.airtableBase.tables.slice(0)

//     // console.log('Cytosissssss: ', this.airtableBase, this.airtableBase['tables'])
//     // console.log('getRecord tables:', tables, ' >> ' , base)


//     if(base && tables) {
//       return new Promise(function(resolve, reject) {
//         // iterate through every table, but only one should resolve, since recordIds are unique
//         // replace with async iterator in the future; this is expensive since it does a fetch for EACH table
//         for (let table of tables) {
//           base(table).find(recordId, function(err, record) {
//             if (err) { 
//               console.log('No record found? ' , record);
//               console.error(err); return; 
//             }
//             console.log('Record found: ' , record);
//             resolve(record)
//           });
//         }
//       })
//     }
//     return new Promise(function(resolve, reject) {
//       reject(false)
//     })
//   },
//     get: function(recordId) { // convenience method
//       return this.getRecord(recordId)
//     },

//   // get a list of airtable objects; use map/get for useful data: list.map(e => (`${e.id} ${e.get('Name')}`))
//   // filter is an airtable filter formula https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference
//   // no default sort: '[{field: 'Name', direction: 'asc'}]'
//   getTablesFromBase: function(options={}, tables=this.airtableBase.tables ) {
//     let pTables = [] // tables (promise)
//     let base = this.getBase()
//     let _this = this

//     // need to follow these defaults for airtable:
//     // view='', fields=undefined, sort=undefined, filter='', 
//     let {view, fields, sort, filter} = options
//     if (!view)
//       view = ''
//     if (!filter)
//       filter = ''

//     if(!this.preCheck())
//       return {}

//     function _getTables() {
//       try {
//         // console.log('Retrieving airtables')
//         for (let table of tables) {
//           let list = []

//           const filterObj = {
//             filterByFormula: filter,
//             view
//           }
//           if(sort) {
//             filterObj['sort'] = sort // need to add this after-the-fact
//           }

//           if(fields && fields[table]) { // if a field for this table exists, add it
//             filterObj['fields'] = fields[table]
//           }

//           let promise = new Promise(function(resolve, reject) {
//             base(table).select(
//               filterObj
//             ).eachPage(function page(records, fetchNextPage) {
//               // This function (`page`) will get called for each page of records.
//               records.forEach(function(record) {list.push(record)})
//               // To fetch the next page of records, call `fetchNextPage`.
//               // If there are more records, `page` will get called again.
//               // If there are no more records, `done` will get called.
//               fetchNextPage();
//             }, function done(err) {
//               if (err) { 
//                 console.error('Airtable error: ', err)
//                 reject(err)
//                 return
//               }
//               resolve({[table]: list})
//             })

//           })
//           pTables.push(promise)
//         }

//       } catch(e) {
//         console.error('Airtable async err', e) // return; 
//       }
//     } _getTables()

//     return Promise.all(pTables).then(function(tables) {
//       let finalObj = {}
//       for (let t of tables) {
//         finalObj = { ...finalObj, ...t }
//       }
//       _this.airtable = finalObj
//       return finalObj // return as a one promise object
//     }, function (reason) {
//       // console.error("Airtable data retrieval error", reason);
//       // console.log(reason);
//       return undefined
//     })
//   },
//     // convenience wrapper
//     getTables: function(options={}, tables=this.airtableBase.tables) {
//       return this.getTablesFromBase(options, tables)
//     },


//   // simple promise-based wrapper for saving to airtable
//   // no recordId: creates a new record
//   // recordId: replaces current record
//   saveObjectToAirtable: function(object, tableName, recordId=undefined) {
    
//     if(!this.preCheck())
//       return

//     let base = this.base
//     try {
//       return new Promise(function(resolve, reject) {
//         if (!recordId) {
//           base(tableName).create(object, function(err, record) {
//             if (err) { console.error('Airtable async save err', err); reject(err); return }
//             console.log('New record: ' , record.getId(), record.get('Name'));
//             resolve(record);
//           });
//         } else {
//           base(tableName).update(recordId, object, function(err, record) {
//             if (err) { console.error('Airtable async save err', err); reject(err); return }
//             console.log('Updated record: ' , record.getId(), record.get('Name'));
//             resolve(record);
//           });
//         }
//       })

//     } catch(e) {
//       console.error('Save Object to Airtable err', e); return; 
//     }
//   },
//     save: function(object, tableName, recordId=undefined) {
//       return this.saveObjectToAirtable(object, tableName, recordId=undefined)
//     },


//   deleteFromAirtable: function(tableName, recordId) {
    
//     if(!this.preCheck())
//       return

//     let base = this.base
//     try {
//       return new Promise(function(resolve, reject) {
//         if (recordId) {
//           base(tableName).destroy(recordId, function(err, record) {
//             if (err) { console.error('Airtable async save err', err); reject(err); return }
//             console.log('Deleted record: ' , record.getId(), record.get('Name'));
//             resolve(record);
//           });
//         }
//       })

//     } catch(e) {
//       console.error('Save Object to Airtable err', e); return; 
//     }
//   },
//     delete: function(tableName, recordId) {
//       return this.deleteFromAirtable(tableName, recordId)
//     },






//   /*

//     Helpers

//   */


//   // Will find a row within an airtables object e.g. airtables: { Content: [ row, row, row], Tags: [ row, row, row ] } 
//   // — it's a lot more efficient to require data to be pulled and cached rather than be pulled per find request
//   // findStr = 'RowName' — finds all items "RowName" inside the airtables object
//   // findStr = 'Content.RowName' — finds all items "RowName" in the Content table
//   // findStr = 'Content.RowName.ColName' — finds a specific ColName inside the Row and returns the results, e.g. if you have a URL column, it'll return the string
//   // findStr = 'Content.RowName.ColName.ColName' — if a ColName contains links, this finds the values of the interior ColNames inside every linked object in the ColName
//   find: function(findStr, airtables, fields=['Name']) {
//     const _this = this

//     // match a single string against all columns (fields) in all objects
//     function matchField(str, airtables, fields) {
//       let results = []
//       Object.keys(airtables).map((table) => {
//         // console.log('Matching', table, airtables[table])

//         // each airtable record
//         for (let record of airtables[table]) {
//           for (let field of fields) {

//             // check if field exists, and if the contents match
//             if(record.fields[field] && str == record.fields[field] ) {
//               // console.log('Match found in', record.fields.Name)
//               results.push(record)
//             }
//           }
//         }
//       })
//       return results
//     }

//     // gets the contents of a specific field (e.g. Tags column)
//     // also converts them from a array of IDs to usable objects
//     function getFieldContent(records, field, linkedTable) {
//       let results = []
//       console.log(`Getting the ${field} contents of`, records)
//       for (let record of records) {
//         const recordIds = record.fields[field]
//         results.push(_this.getLinkedRecords(recordIds, linkedTable, true))
//       }
//       return results
//     }


//     const queries = findStr.split('.')
//     console.log('Looking for: ', queries.join(), ' in ', fields.join())

//     // when just looking for one value, match against the column (field) name
//     if(queries.length == 1)
//       return matchField(queries[0], airtables, fields)

//     if(queries.length == 2)
//       return matchField(queries[1], {q: airtables[queries[0]]}, fields)

//     // when queries > 2, we need to return the contents of the record's field, and not the record itself!
//     // this is just implemented for 3 levels deep for testing
//     const records = matchField(queries[1], {q: airtables[queries[0]]}, fields)
//     return getFieldContent(records, queries[2], airtables[queries[2]])
//   },

//   // *** this doesn't really belong in Cytosis, as it's a template helper
//   //      should consider splitt
//   // places content into an html element with a data-cytosis="findStr" where findStr is a findable string,
//   // e.g. Content.homepage-header will pull the row named "homepage-header" from Content 
//   // dataReplace: function(findStr) {

//   // },




//   reloadAirtable: function() {
//     Airtable.configure({
//       endpointUrl: `https://api.airtable.com`,
//       apiKey: this.airtableApiKey
//     })
//     this.base = Airtable.base(this.airtableBase.id)
//   },

//   getBase: function(baseId = this.airtableBase.id) {
//     return Airtable.base(baseId);
//   },

//   // checks prereqs before interacting with airtable (or other kinds of data sources)
//   preCheck: function() {
//     // airtable only for now
//     if (this.airtableApiKey && this.airtableBase)
//       return true
//     return false
//   },

//   // getRecord works a little better, but requires multiple API calls; this one uses local data
//   // converts a list of record ids into a name (e.g. converts an Id from Tags to the text "ABR")
//   // these are stored inside the data category
//   // old version would take a tableName, new one just takes a table
//   getLinkedRecords: function(recordIds, linkedTable, getObj=false) {
//     let records = []
//     for (let recordId of recordIds) {
//       for (let linkedRecord of linkedTable) {
//         if(recordId == linkedRecord.id) {
//           if(getObj) {
//             records.push(linkedRecord)
//           } else {
//             records.push(linkedRecord.fields.Name)
//           }
//         }
//       }
//     }
//     return records
//   },

//   // splits an object into many parts to be stored to airtable
//   // stores them as JSON; useful for data as a "data warehouse"
//   split: function(saveObject, key, maxChunks=4) {
//     let itemString = saveObject[key] // already stringified
    
//     // if the key (e.g. _data) doesn't exist, just return the object
//     if (itemString === undefined)
//       return saveObject 
    
//     // too big? split the output into an array and into columns _data-1, -2, -3 etc
//     if( itemString.length >= 100000) {
//       // too big for airtable, only keep first 70,000 chars of the content
//       debug('Split', itemString.length)
//       let parts = []
//       let i = 0
//       let chunkSize = 100000
//       let length = itemString.length

//       while (length>0) {
//         parts.push(itemString.substr(i*chunkSize,chunkSize))
//         length -= chunkSize
//         i++
//       }
//       // save the metadata into the original key
//       saveObject[key] = JSON.stringify({
//         chunks: i,
//         chunkSize: chunkSize,
//       })

//       // _data stores the metadata
//       let j = 0
//       if(i < maxChunks) { // hard limit 
//         while (j < i) {
//           saveObject[`${key}-${j+1}`] = parts[j]
//           j++
//         }
//       }
//     }
//     return saveObject
//   },





//   unsplit: function(record, key) {
//     // a split record will always have chunks and chunkSize
//     // return the record if it doesn't have a split
//     if(!record.fields[key] || !JSON.parse(record.fields[key]).chunks)
//       return JSON.parse(record.fields[key])

//     const chunks = JSON.parse(record.fields[key]).chunks
//     let itemString = ''
//     let i=0

//     while (i<chunks) {
//       itemString += record.fields[`${key}-${i+1}`]
//       i++
//     }

//     return JSON.parse(itemString)
//   },





//   // resolves linked tables like tags and collections (b/c airtable doesn’t return table details this has to be semi-manual)
//   // takes a list of string or data objects, adds them to the base, and return a list of ids where they were just added
//   // for each object in a list (e.g. a list of tag names):
//   // 1. resolve against the existing objects (e.g. Tag records), if it exist, use the existing id
//   // 2. if it’s a new object, add it to the table and get the id
//   // 3. return the new array of ids
//   // "Tags": fave.tags ? await resolveLinkedTable(base, fave.tags, 'Tags', _this.$store.state.data.tags) : [],
//   // "Collections": fave.collections ? await resolveLinkedTable(base, fave.collections, 'Collections', _this.$store.state.data.collections) : [],
//   resolveLinkedTable: async function(list, tableName, sourceTable, colName='Name') {
//     // console.log('tabName', tableName, 'dL', dataList.join(),  'orig source:', sourceTable.join())

//     let base = this.base

//     let result = await list.reduce(async (resultPromise, listItem) => {
//       const result = await resultPromise

//       // find a match and return the id
//       for (let record of sourceTable) {
//           // console.log('matching', listItem, record.get('Name'))
//         const recordName = record.get(colName)
//         if (recordName && listItem.toLowerCase() == recordName.toLowerCase()) {
//           // console.log('match ...', record.id, record.get('Name'))
//           return result.concat(record.getId())
//         } 
//       }
//       // if no match, we have to create a new one and get its id
//       // console.log('creating a new linked record; no match for ', listItem)
//       let recordId = await this.saveObjectToAirtable({'Name': listItem}, tableName)
//       // console.log('new recordId:', recordId.id, ' ress ', result)
//       return result.concat(recordId.id)
//     }, Promise.resolve([]))

//     // console.log('result: ' , result)
//     return result
//   },



// };


























// // global functions
// Cytosis.configure = function(opts) {
//   Cytosis.airtableApiKey = opts.airtableApiKey;     // airtable api key 
//   Cytosis.airtableBase = opts.airtableBase;         // airtable base (support multiple later)
// };

// export default Cytosis











































// /* 

// These are pulled from the first experiment w/ ATLX. It mutates the airtable object into indexable/searchable arrays
// But w/ Cytosis, they've been supplanted by cytosis.find('')


// flatten: function(airtable) {

//   // flatten all of airtable to row-level array for easy filtering and manipulation
//   // [ {__id: 'Content.home', ...data }]
//   const airtableflat = Object.keys(airtable).map(table => {
//     // console.log('flatten table:',table)
//     var rows = Object.keys(airtable[table]).map(row => {
//       // console.log('row data', airtable[table][row])
//       let returnObj = airtable[table][row]
//       returnObj['__id'] = table + '.' + row
//       return returnObj
//       // return {__id: table + '.' + row, ...airtable[table][row]} // not supported by some browsers
//     })
//     return rows
//   }).reduce((acc, curValue) => {
//     return acc.concat(curValue)
//   }, [])

// }




// // e.g. data-airtable="Content.Home Page.Intro"
// // will create an airtable content query for the tab 'Content', the 'Home Page' row, and 'Intro' column
// function airtableReplacer(airtable) {
//   // console.log('airtable >>> ', airtable['Music']['DJ Khaled']['Notes'])

//   // flatten all of airtable to row-level array for easy filtering and manipulation
//   // [ {__id: 'Content.home', ...data }]
//   const airtableflat = Object.keys(airtable).map(table => {
//     // console.log('flatten table:',table)
//     var rows = Object.keys(airtable[table]).map(row => {
//       // console.log('row data', airtable[table][row])
//       let returnObj = airtable[table][row]
//       returnObj['__id'] = table + '.' + row
//       return returnObj
//       // return {__id: table + '.' + row, ...airtable[table][row]} // not supported by some browsers
//     })
//     return rows
//   }).reduce((acc, curValue) => {
//     return acc.concat(curValue)
//   }, [])

//   console.log('Dance CMS:', airtableflat)

//   // populate airtable data tags
//   $('[data-airtable]').each(function(i) {
//     var queries = $(this).data('airtable').split('.')
//     // console.log('airtable: ', $(this).data('airtable'), queries)

//     // break if unpublished
//     let isPublished = airtableflat.filter(item => (
//           item.__id == `${queries[0]}.${queries[1]}`
//         ))[0].isPublished
//     if(!isPublished) return;

//     // row result; filter returns an array but we assume the __ids are unique so array will always be len=1
//     let result = airtableflat.filter(item => (
//       item.__id == `${queries[0]}.${queries[1]}`
//     ))[0][queries[2]]

//     // old iterative loop before .map/reduce flattening 
//     // for (var q in queries) {
//     //   var query = queries[q]
//     //   // nested looping to get nested objects airtable[query1[query2[query3...]]]

//     //   // every airtable row needs an isPublished column / depth=1
//     //   if (depth==1 && !result[query].isPublished) {
//     //     console.log('test!', result[query].isPublished)
//     //     return false;
//     //   }

//     //   // console.log('in >> ' , result , ' ? ', query)
//     //   // if the query is undefined, break the loop
//     //   if(result[query] !== undefined) {
//     //     result = result[query]
//     //     depth++
//     //   }
//     //   // console.log('test::: ' , queries[q], airtable[queries[q]], result)
//     // }


//     if (typeof(result) == 'string'){
//       // markdown output
//       // console.log($(this).data('type'), result)
//       if($(this).data('type') == 'raw')
//         $(this).html(result) // don't render markdown
//       else {
//         try {
//           $(this).html(md.render(result))
//           $(this).find('*').addClass($(this).data('airtable-classes')) // applies data-airtable-classes to all children
//         } catch(e){
//           console.err(e, ' result:', result)
//         }
//       }
//     } else {
//       // handle a bunch of edge cases. these are arrays
//       // console.log('edge case:', result)

//       // check if array
//       if ( result === undefined || !('length' in result) || !(result.length > 0)) {
//         console.log('result is not array:', result)
//         return;
//       }

//       // handle array of strings (e.g. references)
//       // nested linked query: data = Schedule.FriMain.Venue.LocName
//       // Venue is linked to a Venues row, which has LocName
//       if (typeof(result[0]) == 'string' ) {
//         // if query length = 4 we know these are ref links
//         // only go one reference deep for now

//         const refs = result; // array of refs; this makes it easier to think about
//         let output = ""; 
//         // output to be rendered; have to collect output since we're looping arrays
//         // we render output by rendering inside and then duplicating the current outer element for the # of instances

//         for (let _ref of refs) {
//           var ref = airtableflat.filter(item => (item.id == _ref))[0]
//           // console.log('strings (ID):', _ref, ref, [queries[3]], ref[queries[3]])
//           // console.log('ref (ID):', _ref, [queries[3]], ref[queries[3]])
//           try {
//             // if there's a linked href, we can attach it; useful for linked url records
//             // get the query through the special linkedhref tag
//             if($(this).data('airtable-linkedhref'))
//               $(this).attr('href', ref[$(this).data('airtable-linkedhref')])

//             if($(this).data('type') == 'raw') {
//               var elem = $(this).html(ref[queries[3]])
//               output +=  $('<div>').append($(elem).clone()).html(); // get outerHtml
//             } else { 
//               var elem = $(this).html(md.render([queries[3]]))
//               output +=  $('<div>').append($(elem).clone()).html(); // get outerHtml
//             }
//           } catch(e){
//             console.error('Reference error, need a column name from:', ref, _ref)
//           }
//         }        

//         // console.log('render::' , output)
//         $(this).replaceWith(output)
//         return;
//       } 
      
//       // handle image attachments here
//       // how to figure out if an array of attachments
//       if ( ('type' in result[0]) ) {
//         // console.log('attachments:', result)
//         // result[0].type == 'image/jpg'
//         // default to only handling first image
//         $(this).html(`<img src="${result[0].url}" />`)
//         return;
//       } 

//       // how to figure out if reference
//     }
//   })

//   // populate href tags
//   $('[data-airtable-href]').each(function(i) {
//     var queries = $(this).data('airtable-href').split('.')
//     // console.log('airtable: ', $(this).data('airtable'), queries)

//     // break if unpublished
//     let isPublished = airtableflat.filter(item => (
//           item.__id == `${queries[0]}.${queries[1]}`
//         ))[0].isPublished
//     if(!isPublished) return;

//     // row result; filter returns an array but we assume the __ids are unique so array will always be len=1
//     let result = airtableflat.filter(item => (
//       item.__id == `${queries[0]}.${queries[1]}`
//     ))[0][queries[2]]

//     // handle array of strings (e.g. references) / copypasta from above
    
//     if (typeof(result) == 'string') {
//       $(this).attr('href',result)
//     } else if (result !== undefined && typeof(result[0]) == 'string' ) {
//       const refs = result;
//       for (let _ref of refs) {
//         var ref = airtableflat.filter(item => (item.id == _ref))[0]
//         $(this).attr('href',ref[queries[3]])
//         return;
//       }        
//     } 
//   })
// }



// */

// export function Cytosis() {
//   return Cytosis;
// }


