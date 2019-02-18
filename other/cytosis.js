
// Test version of cytosis 8/23 - 9/12 London

/*
  - Added to new npm package 9/12
  
  - made lots of functions static
  - added dynamic rows to init, can specify what row in _cytosis to pull from now
  - changed from .get() to .fields[] to get away from using the prototype
  - added getFieldValues
  - changed search() to comb through multiple list of strings
  - added getNames to get flat list of row names
  - started to add better comments on functions w/ input/output
  - changed key/base names to airKey and airBase
  - made get() synchronous
  - added linked column search to Find(), e.g. TableName.RecordName.ColName.LinkedColName
  - changed split / unsplit behavior to not affect user too much
    - user still has to save each new split field to Airtable
    - can now unsplit Airtable data and data will appear "normal"
  - changed the way getTables is accessed: takes a single object arg now
  - changed _cytosis column from 'Items' to 'Tables' -> will be severely breaking


  - 2/17/2019
    - tableQuery changed to tableQuery


*/

/*

  Cytosis CMS (cytosis)

    - Cytosis grabs and stores/caches data. Very useful for Airtable.
      - Turns Airtable-centric into a light static CMS like Contentful

    - Cytosis currently WRAPS THE Airtable API!
      - The Airtable API is kind of huge
      - future: localstorage and mLab/mongo/firebase
        - for offline access
        - for multiple devices

    - so in the future some of these should be separated
    - getLinkedRecords should be static






  Future / roadmap

    - Build a vue plugin kind of like: https://github.com/vuejs/vuefire/tree/firestore
    - possible to do a last changed time stamp, and changed by who and ID number stored in _cytosis metadata
      - can do things like simple change tracking etc.
    - preload — specify which tables to load first, which to defer
      - load the content tables in first, and the massive data later
      - also can load contextual metadata (like what page is it, where to get resources, etc.)
    - static — specify which tables are static / won't change much
      - used for static page generation that speeds up page loads
    - cytosis controller table
      - can use this to variably set other table names w/o hard coding
    - front-end wrapper
      - jquery, non-vue getter
        - maybe extend jquery prototype?
        - maybe have another 'helper' class or set of functions that don't belong to regular Cytosis?
      - public API key
      - extensible version of the atlx experiment
    - keepAlive syncing / polling w/ Airtable (not fully reactive like Meteor 
      - but can sync+cache at 5 ticks/sec
      - webtask can sync/cache at 1 tick/sec
    - add fetch / delayed retrieval for some tables (also maybe in _cytosis as a separate row)
      - idea is we don't always want to grab everything from Airtable; some huge tables are better put off til needed
    - cytosis webtask (for public interfaces)
    - make easier to specify '_cytosis' or supply an array of data:{ [tableNames] }
    - clean up and unify schema
    - partial downloads: can set some to be deferred to be downloaded until needed (makes initial site load faster)
      - partial table downloads, e.g. for searching, so not as much data needs to be pulled
    - support prisma API / support partial downlaods from graphql
    - support firebase
    - 

  Bugs

    - SaveLinkedTable, if save clicked multiple times, doesn't check for duplicates already added, so can potentially add several of the same tags
      - probably the source needs to refresh, not sure if cytosis could fix it
      - this has to be done:: (local needs to be refreshed) this.cytosis.tables.Tags = this.tags // refresh local tags store


  Thoughts / Ideas / Notes / Done

    - using airtableobject.get('Name') doesn't always work, since sometimes the prototype doesn't get preserved
      - this is true w/ Nuxt 'Universal' (static) mode


*/



/*
  
  "Docs"


  - Getting Started - 

    Cytosis is for using Airtable as a prototype CMS
    Core user data is best not stored using this system. Use something like auth0 or firebase instead.

    Best for Public Content
      - Sometimes you want to display content from a CMS. Cytosis turns Airtable into one.
      - Create a separate user with view-only access, and use its API key as the cytosis API key
        - The key is used the exact same way as a regular key, except create/update/delete will throw errors 
      - Ex: Website content, blog content, news articles, lists or browsable data like bookmarks or store data

    For Private content, use sparingly
      - Passworded sites and local apps can hardcode the API key (airKey) directly in cytosis
      - KEEP IN MIND that cytosis code is visible in the code inspector. 
      - One way to guard against this is for users to enter their Airtable API key and Base ID manually
      - You can also use a serverless function as authentication, and provide the API and Base after authentication

    Private/Public Content
      - Any sites w/ functionality to update Airtable as well as read from Airtable for the masses
      - If there's a login system, you can create a handler that retrieves a user's private API key and load it into their system
        - the privateKeyHandler is just a convenient place to store the serverless URL that retrieves this data
      - Semi-private: Todo lists, shopping lists — apps that run on a public machine, but users have edit access to their own repo
        - Retrieve the private API key from a server or external system after login
      - Public-private: Feedback forms, rating systems, commenting systems, interactive projects — users can all edit the same data repository will require an external server handler
        - Use a public API for read, and process create/update/delete requests via an external handler

    // init Cytosis
    const cytosis = await new Cytosis({
      airKey: 'key value' — if used on front-end projects, make sure it's on a separate airtable account w/ read-only permissions!!
      airBase: {
        id: 'Airtable Base ID key', 
        tables: [array of table names]} — optional; otherwise looks for _cytosis table, w/ a column called Items w/ multiple select
    })

    You can also:

    1. Either set a default Base and Key for Cytosis object itself
    2. myCytosis = await new Cytosis({airKey: '123', airBase: '123'}) — defaults to looking for _cytosis table
    3. myCytosis = await new Cytosis({airKey: '123', airBase: '123', tables: ['table1','table2']}) — just reads/caches the given tables
    4. myCytosis = await new Cytosis({airKey: '123', airBase: '123', tableQuery: 'tableName'}) — tableName is the name of the table index row in _cytosis. You can add Items to the custom table name for dynamic loading
    4. myCytosis = await new Cytosis({airKey: '123', airBase: '123', tableQuery: 'tableName'}, {view: 'Grid View'}) — you can also specify an Airtable API options object w/ view, fields, sort, filter

    // Airtable options: filter is an Airtable filter formula https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    // Cytosis loads tables from _cytosis table instead of hard-coded
    // create a row w/ Name="tableNames" and a Multiple Select called 'Items' with the table names

    // After initialization, the myCytosis.tables will contain all loaded tables 

  - Usage -

    cytosis.get('recordId')
    // returns a promise of data of a single record
    // useful when you have an array of recordIds

    cytosis.getTables(options={}, tables=this.airBase.tables)
    // returns a promise of data of a single record
    // {options} are: view, fields, sort, filter, per the Airtable API
    // [tables] is an array of table names (default is to retrieve whatever has been initiated)

    cytosis.save(object, tableName, recordId=undefined)
    // {object} is the object you want saved. Fields must match those of the table or not be defined
    // 'tableName' is the name of the table you're saving your object to
    // 'recordId' lets you update an existing record. Unfortunately you still have to supply the tableName per the API

    cytosis.delete(tableName, recordId)
    // 'tableName' is the name of the table to delete your object from. API requires you to state tableName
    // 'recordId' is the record to be deleted. 

  - Helpers -

    cytosis.getLinkedRecords(recordIds, linkedTable, getObj=false)
    // airtable excels at creating links between records. These links are stored as arrays of recordIds
    // this converts the linked records to an array of Names (for Tags this is sufficient)
    // if you need the entire objects, set getObj to true
    // [recordIds] is an array of links (e.g. a list of tag references to the Tags table)
    // 'linkedTable' is the table name e.g. 'Tags' where the records are stored

    cytosis.split(saveObject, key, maxChunks=4)
    // this one splits huge objects (stringified > 100,000 chars) across multiple columns
    // e.g. an object to be stored in key _data gets split into _data _data-1 _data-2
    // the table needs to have those extra columns created in Airtable, so this requires some planning 
    // {saveObject} is the object you want to store
    // 'key' is something like _data 

    cytosis.unsplit(record, key)
    // {record} is the actual record object from Airtable (not a record Id)
    // 'key' is the what you want to unsplit (e.g. '_data' from the above example)


*/


import * as Airtable from 'airtable'


class Cytosis {

  // opts:
  // airtableApi: env.airtable_api,
  // airBaseId: env.airtable_base
  // 
  // automatically get tables on init, unless given tables
  // (getting tables is expensive, and might not always be required on init)
  // options is a temporary view for initializing the table
  constructor (opts, options) {
    const _this = this

    // If constructing without arguments,
    // then initialize "this" with either pre-configured values, or blanks
    if (arguments.length === 0) {
      _this.airKey = Cytosis.airKey || '';
      _this.airBase = Cytosis.airBase || '';
      _this.airBase.tables = Cytosis.tables || [];
      _this.airBase.tableQuery = Cytosis.tableQuery || 'tables';
      _this.airBase.options = Cytosis.options || {view: "Grid view"};
    } else {
      _this.airKey = opts.airKey || opts.airKey;
      _this.airBase = { id: opts.airBase || opts.airBaseId };
      _this.airBase.tables = opts.tables || []
      _this.airBase.tableQuery = opts.tableQuery || 'tables';
      _this.airBase.options = opts.options || {view: "Grid view"};
    }

    Airtable.configure({
      endpointUrl: `https://api.airtable.com`,
      apiKey: _this.airKey
    })

    _this.base = Cytosis.getBase(this.airBase.id)

    // console.log('opts: ', opts)
    // return a promise if the callee needs to do something w/ the result
    return new Promise(function(resolve, reject) {
      // first retrieve the _cytosis table of tables
      _this.init(_this.airBase.tableQuery).then((result) => {

        if(result) {
          // console.log('[Cytosis] _cytosis initiated:', result)
          // then retrieve the actual data
          Cytosis.getTables({options, cytosis: _this, tables: _this.airBase.tables}).then((_result) => {
            _this.tables = _result
            resolve(_this)
          })
        } else {
          if(!result)
            reject(result)

          resolve(result)
        }
      })
    })
  }








  /*





    Methods





  */


  // Internal
  // formerly initConfig() initializes _config table from Airtable; pulls from _cytosis if no init data
  // will overwrite current table data; useful to rehydrate data
  // (but pulls in EVERYTHING from Airtable)
  // assumes you want to "reinitialize" with new data; if passed 'false',
  // skips initialization if data already exists
  init (tableQuery, reset=true) {
    // console.log('Starting cytosis')
    const _this = this

    // console.log('initializing from index: ', tableQuery)

    return new Promise(function(resolve, reject) {

      // return current state if we don't want to reinitialize
      if(!reset && _this.airBase.tables && _this.airBase.tables.length > 0) {
        resolve(_this)
      }

      // if we provided tables, then don't load the _cytosis tableNames
      if(_this.airBase.tables && _this.airBase.tables.length > 0)
        resolve(_this)


      // if no table names are provided, it looked for a special '_cytosis' tab
      // this is required to initialize the Cytosis object
      Cytosis.getTables({options: {}, cytosis: _this, tables: ['_cytosis']}).then( (_config) => {
        if(_config) {
          _this['config'] = _config

          // this requires a table named '_cytosis' with a tableQuery row named 'tableNames' or 'tables' or a user given name and a 
          // column 'Tables' with a Multiple Select of all the table names in the base
          // (this is required b/c Airtable API won't let you get all table names)
          // init tables from config if they don't exist
          if ( !_this.airBase.tables || _this.airBase.tables.length == 0 ) {
            for(let config of _config._cytosis) {
              if ( config.fields['Name'] == tableQuery && config.fields['Tables']) {
                _this.airBase.tables = config.fields['Tables']

                // some queries can contain options like fields, sort, maxRecords etc.
                // these can drastically cut back the amount of retrieved data
                let options = {
                  fields: config.fields['fields'], // fields to retrieve in the results
                  filter: config.fields['filterByFormula'],
                  maxRecords: config.fields['maxRecords'],
                  pageSize: config.fields['pageSize'],
                  sort: config.fields['sort'] ? JSON.parse(config.fields['sort'])['sort'] : undefined, // needs to be of format : "{sort: [blahblah]}"
                  view: config.fields['view'],
                }
                _this.airBase['options'] = options
              }
            }
          }
        }

        if(!_config || !_this.airBase.tables || _this.airBase.tables.length == 0) {
          throw new Error(`[Cytosis] — couldn’t find a '_cytosis' table with row ${tableQuery} or 'tables' filled out with the names of tables to load`)
          reject(_this)
        }
        // console.log('Cytosis tables: ', _this.airBase, _this.airBase.tables)
        // return the initiated cytosis object on completion
        resolve(_this)
      })

    })
  }

  find (findStr, fields=['Name']) {
    return Cytosis.find(findStr, this.tables, fields)
  }

  // getRemote (recordId) {
  //   // finds remotely; maybe break this out in a different fn or run it
  //   // if not found locally?
  //   // base(table).find(recordId, function(err, record) {
  //   //   if (err) { 
  //   //     console.log('No record found? ' , record);
  //   //     console.error(err); return; 
  //   //   }
  //   //   console.log('Record found: ' , record);
  //   //   resolve(record)
  //   // });
  // }





  // AIRTABLE MODIFIERS

  // — these require API key w/ write permission or they'll fail
  save (object, tableName, recordId=undefined) {
    return Cytosis.save(object, tableName, recordId)
  }

  delete (tableName, recordId) {
    return Cytosis.delete(tableName, recordId)
  }

  saveLinkedTable (stringList, targetTableName, sourceTable, colName='Name') {
    return Cytosis.saveLinkedTable(stringList, targetTableName, sourceTable, colName)
  }





  /*






    Static Methods
      - Helpers that make life easier / faster





  */

  // Input: base ID (from airtable)
  // Output: Airtable base object
  static getBase (baseId) {
    return Airtable.base(baseId);
  }

  static preCheck (airKey, airBase) {
    // airtable only for now
    if (airKey && airBase)
      return true
    return false
  }


  // Get an object of airtable objects
  // NOTE: this is the ONLY function that pulls from Airtable API!
  // 
  // use map/get for useful data: list.map(e => (`${e.id} ${e.get('Name')}`))
  // filter is an airtable filter formula https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference
  // no default sort: '[{field: 'Name', direction: 'asc'}]'
  // Input: 
  //    options: airtable API options {view, fields, sort, filter}
  //    cytosis: cytosis object (with base, airkey, etc.)
  //    tables: array of table names ['tableOne','tableTwo', ...]
  // Output: 
  //    creates object of airtable table record arrays
  //    sets this.tables to the object (overwrites any previous tables)
  //    returns the object
  // 
  //    this.tables = {
  //      tableOne: [record object, record object, ...]
  //      ...
  //    }
  // getTables (options={}, tables=this.airBase.tables ) {
  // static getTables ({options, tables=this.airBase.tables}) {
  static getTables ({options, cytosis, tables}) {

    options = options || cytosis.airBase.options || {}
    tables = tables || cytosis.airBase.tables

    let pTables = [] // tables (promise)
    let base = Cytosis.getBase(cytosis.airBase.id)
    // let _this = this

    // need to follow these defaults for airtable:
    // view='', fields=undefined, sort=undefined, filter='', 
    let {view, fields, sort, filter, maxRecords, pageSize} = options
    if (!view)
      view = ''
    if (!filter)
      filter = ''

    if(!Cytosis.preCheck(cytosis.airKey,cytosis.airBase))
      return {}

    function getTablePromise() {
      try {
        // console.log('Retrieving airtables')
        for (let table of tables) {
          let list = []

          const filterObj = {
            filterByFormula: filter,
            view
          }

          if(sort) {
            filterObj['sort'] = sort // need to add this after-the-fact
          }

          if(maxRecords) {
            filterObj['maxRecords'] = maxRecords // limit # of records
          }

          if(pageSize) {
            filterObj['pageSize'] = pageSize // limit # of records
          }

          if(fields && fields[table]) { // if a field for this table exists, add it; (old structure)
            filterObj['fields'] = fields[table]
          } else if (fields) { // new structure
            filterObj['fields'] = fields
          }



          let promise = new Promise(function(resolve, reject) {
            base(table).select(
              filterObj
            ).eachPage(function page(records, fetchNextPage) {
              // This function (`page`) will get called for each page of records.
              records.forEach(function(record) {list.push(record)})
              // To fetch the next page of records, call `fetchNextPage`.
              // If there are more records, `page` will get called again.
              // If there are no more records, `done` will get called.
              fetchNextPage();
            }, function done(err) {
              if (err) { 
                console.error('Airtable error: ', err)
                reject(err)
                return
              }
              resolve({[table]: list})
            })

          })
          pTables.push(promise)
        }

      } catch(e) {
        console.error('Airtable async err', e) // return; 
      }
    } getTablePromise()

    return Promise.all(pTables).then(function(tables) {
      let finalObj = {}
      for (let t of tables) {
        finalObj = { ...finalObj, ...t, ...cytosis.data }
      }
      // _this.airtable = finalObj
      // _this.tables = finalObj

      return finalObj // return as a one promise object
    }, function (reason) {
      console.error("Airtable data retrieval error", reason);
      // console.log(reason);
      return undefined
    })
  }

  // Retrieves a single record from the stored tables object
  // Note: this only searches locally
  // 
  // replaced: getRecord (recordId)
  // Input: recordId (Airtable record ID, a string)
  // Output: a single record object
  static get (recordId, tables) {
    // const base = this.getBase(this.airBase.id)
    // const tables = this.tables // slice makes a shallow copy
    let result

    if(tables) {
      // return new Promise(function(resolve, reject) {
        // iterate through every table, but only one should resolve, since recordIds are unique
        // replace with async iterator in the future; this is expensive since it does a fetch for EACH table
        Object.keys(tables).map( (table) => {
          for (let record of tables[table]) {
            if (record.id == recordId) {
              // return record
              result = record
            }
          }
        })
          
        return result
          
        // reject() // nothing found
      // })
    }
    return undefined
    // return new Promise(function(resolve, reject) {
    //   reject(false)
    // })
  }






  // Will find a row within an airtables object e.g. airtables: { Content: [ row, row, row], Tags: [ row, row, row ] } 
  // — it's a lot more efficient to require data to be pulled and cached rather than be pulled per find request
  // findStr = 'RowName' — finds all items "RowName" inside the airtables object
  // findStr = 'Content.Row Name' — finds all items "RowName" in the Content table
  // findStr = 'Content.Row Name.ColName' — finds a specific ColName inside the Row and returns the results, e.g. if you have a URL column, it'll return the string
  //           if this is a link, it'll return an array of linked objects' record Id names
  // findStr = 'Content.RowName.ColName.LinkedColName' — if a ColName contains links, LinkedColName refers to the field in the linked table. Very useful to get the names or other data
  // ex: cytosis.find('Content.slug', [this.cytosis.tables.Notes], ['Slug'])
  // - both RowName and ColName can contain spaces
  // * assumes Names are unique; will return the first one found
  // 
  // Input:
  //    findStr: a specially formatted string used to retrieve data
  //    tables: an object of Airtable arrays, ex: { Tags: [records], Content: [records] }
  //    fields: an array of which fields (columns) to search in (an array of strings). Airtable's key field default is 'Name'
  // Output:
  //    if findStr is just a RowName, returns the first found // FUTURE: an array of results if many matches, or one result if only one found
  //    returns the field's contents, usually a string or array
  //    if the field is a link to another table, will return an array of recordIds
  // static find (findStr, tables=this.tables, fields=['Name']) {
  static find (findStr, tables, fields=['Name']) {

    if(!findStr || !tables)
      return []


    // console.log('[find] Tables:', tables)

    // match a single string against all columns (fields) in all objects
    function matchField(str, tables, fields) {
      let results = []

      // given an object...
      Object.keys(tables).map((table) => {
        // console.log('Matching', str, tables, fields, table, tables[table])

        // console.log('Current object format:', tables)

        if(!tables[table])
          throw new Error(`[Cytosis] — Couldn’t find a match. Make sure you're looking in the right place. Reference table/string: (${tables[table]} / ${findStr}). Required Format was probably wrong: { Content: [ row, row, row], Tags: [ row, row, row ] }. `)
        // each airtable record
        for (let record of tables[table]) {
          for (let field of fields) {

            // check if field exists, and if the contents match
            if(record.fields[field] && str == record.fields[field] ) {
              // console.log('Match found in', record.fields.Name)
              results.push(record)
            }
          }
        }
      })
      return results
    }

    const queries = findStr.split('.')
    // console.log('Looking for', queries.join(', '), 'in', fields.join(), 'tables:', tables, queries.length)

    // when just looking for one value, match against the column (field) name
    if(queries.length == 1)
      return matchField(queries[0], tables, fields)[0] // return the FIRST result

    if(queries.length == 2)
      return matchField(queries[1], {q: tables[queries[0]]}, fields)

    // when queries > 2, we need to return the contents of the record's field, and not the record itself!
    // this is just implemented for 3 levels deep for testing
    const records = matchField(queries[1], {q: tables[queries[0]]}, fields)

    // return if it's a string or nonarray
    // assume Name is unique, otherwise complicated; return first found
    if(!Array.isArray(records[0].fields[queries[2]])) {
      return records[0].fields[queries[2]]
    }

    // could be an array of IDs... or array of strings and images
    const fieldContent = records[0].fields[queries[2]]

    // 4 deep returns the linked field's content, which we assume to be Ids
    if(queries.length == 4) {
      let result = []
      // can't use getLinkedRecords b/c we have no idea where they come from
      // const linkedRecords = Cytosis.getLinkedRecords(fieldContent, tables, true)
      for (let id of fieldContent) {
        const record = Cytosis.get(id, tables)
        result.push(record.fields[queries[3]])
      }
      return result.join(', ') // returns a joined string of linked objects' fields (e.g. the names of linked tags)
      // return fieldContent[0].fields[queries[3]] // returns the FIRST linked field
    }

    // otherwise just return whatever is in that field, e.g. an array of image objects, etc.
    return fieldContent
  }




  // simple promise-based wrapper for saving to airtable
  // no recordId: creates a new record
  // recordId: replaces current record
  // note that the API requires tablename regardless; either we find it or pass it in
  // Input: 
  //    object: a JS object with one or more keys that match field (column) names in the table
  //    tableName: a string indicating what table to save to
  //    recordId: a string, if defined, would save the object into the existing record w/ recordId
  // Output:
  //    an object: the saved record object as returned from Airtable
  static save (object, tableName, cytosis, recordId=undefined) {
    
    if(!Cytosis.preCheck(cytosis.airKey,cytosis.airBase))
      return

    let base = cytosis.base
    try {
      return new Promise(function(resolve, reject) {
        if (!recordId) {
          base(tableName).create(object, function(err, record) {
            if (err) { console.error('Airtable async save error', err); reject(err); return }
            console.log('New record: ' , record.getId(), record.fields['Name']);
            resolve(record);
          });
        } else {
          base(tableName).update(recordId, object, function(err, record) {
            if (err) { console.error('Airtable async save error', err); reject(err); return }
            console.log('Updated record: ' , record.getId(), record.fields['Name']);
            resolve(record);
          });
        }
      })

    } catch(e) {
      console.error('Save Object to Airtable error (do you have permission?)', e); return; 
    }
  }


  // Deletes an existing record from a table
  // The given API key needs account permission to delete
  // Input:
  //    tableName: a string, the name of the table
  //    recordId: a string, the Id of the record to be deleted
  // Output:
  //    an object: the deleted record object as returned from Airtable
  static delete (tableName, recordId) {
    if(!Cytosis.preCheck(this.airKey,this.airBase))
      return

    let base = this.base
    try {
      return new Promise(function(resolve, reject) {
        if (recordId) {
          base(tableName).destroy(recordId, function(err, record) {
            if (err) { console.error('Airtable async delete error', err); reject(err); return }
            console.log('Deleted record: ' , record.getId(), record.fields['Name']);
            resolve(record);
          });
        }
      })

    } catch(e) {
      console.error('Delete Object from Airtable error (do you have permission?)', e); return; 
    }
  }


  // Saves a list of strings to a target table
  // If a string is not matched, it's created as a unique record in the target table
  // If a string is found as a match in the target table (usually the key field 'Name'), a new record doesn't get created
  // Returns an array of ids of all matched or new records
  // 
  // Really useful for tables like Tags that basically just have 'Name'. This dedupes the rows, and makes sure saved items are 
  // tagged properly
  // - Make sure to use this on fields like "Tags" that have linked data
  // - This will return an array of ids that Airtable will save as Links to the other table
  // - *** Make sure to update your local tables getTables
  // 
  // resolves linked tables like tags and collections (b/c Airtable doesn’t return table details this has to be semi-manual)
  // takes a list of string or data objects, adds them to the base, and return a list of ids where they were just added
  // for each object in a list (e.g. a list of tag names):
  // 1. resolve against the existing objects (e.g. Tag records), if it exist, use the existing id
  // 2. if it’s a new object, add it to the table and get the id
  // 3. return the new array of ids
  // "Tags": fave.tags ? await resolveLinkedTable(base, fave.tags, 'Tags', _this.$store.state.data.tags) : [],
  // "Collections": fave.collections ? await resolveLinkedTable(base, fave.collections, 'Collections', _this.$store.state.data.collections) : [],
  // static async resolveLinkedTable(list, tableName, sourceTable, colName='Name') {
  // note, uses this.save, so can't be static!
  // Input:
  //    stringList: an array of strings that represent the records (e.g. Tag Names) in the target
  //    targetTableName: the name of the target table (e.g. "Tags")
  //    sourceTable: an array of Airtable record objects where the matches could be found
  //    colName: usually matches the 'Name' (default) field but could be anything
  // Output:
  //    an array of record Ids that match the list
  static async saveLinkedTable(stringList, targetTableName, sourceTable, colName='Name') {
    let recordIds = await stringList.reduce(async (resultPromise, listItem) => {
      const _result = await resultPromise

      // find a match and return the id
      for (let record of sourceTable) {
        const recordName = record.fields[colName]
        if (recordName && listItem.toLowerCase() == recordName.toLowerCase()) {
          return _result.concat(record.getId())
        } 
      }
      // if no match, we have to create a new one and get its id
      let recordId = await Cytosis.save({'Name': listItem}, targetTableName)

      // bug? this touches the sourceTable
      // is it possible to set sourceTable = stringList (thus updating the source to include the list) from here?
      // sourceTable might be passed by reference making it possible, or that might need to be done on the calling fn
      // otherwise you get duplicate tags / linked table rows

      return _result.concat(recordId.id)
    }, Promise.resolve([]))

    // console.log('result: ' , result)
    return recordIds
  }














  // Given a list of recordIds, gets the actual linked records
  // getRecord works a little better, but requires multiple API calls; this one uses local data
  // converts a list of record ids into a name (e.g. converts an Id from Tags to the name or the entire object)
  // these are stored inside the data category
  // old version would take a tableName, new one just takes a table
  // this works like "Lookup" of airtable
  // Input: 
  //    recordIds: ['recordId','recordId']
  //    sourceArray: array of records where the recordIds could be found
  //    getObj: if true, will return entire object, otherwise just gets the name of the row
  // Output:
  //    either an array of names or array of Airtable records
  static getLinkedRecords (recordIdArray, sourceArray, getObj=false) {
    if(!recordIdArray || !sourceArray)
      return []

    let records = []
    for (let recordId of recordIdArray) {
      for (let linkedRecord of sourceArray) {
        if(recordId == linkedRecord.id) {
          if(getObj) {
            records.push(linkedRecord)
          } else {
            records.push(linkedRecord.fields['Name'])
          }
        }
      }
    }
    return records
  }

  // gets the contents of a field/column (e.g. an Attachments or 'Links to Tags' column)
  // If linked, also converts them from a array of IDs to usable objects
  // Otherwise returns the array of contents that map to the original array
  //  - useful for getting image attachments and multiple select list values
  // FUTURE: eventually should work on duplicate names, but that gets super confusing to 
  // handle returned values; findReplacing works really well if names are treated unique
  // Input:
  //    recordArray: array of Airtable record objects that we want more information on
  //    fieldName: name of the field/column to retrieve
  //    linkedTable: array of Airtable records that we pull linked content from (e.g. Tag info)
  //      - if linkedTable is left undefined, we'll just get an array of recordIds for each record
  // Output:
  //    An array of records: if we retrieve linked table records
  //    An array of results. results.len = recordArray.len
  //    each result could be an array, so the result is very likely a 2D array
  static getFieldContent(recordArray, fieldName, linkedTable=undefined) {
    let results = []
    // console.log(`Getting the ${fieldName} contents of`, recordArray)
    for (let record of recordArray) {

      if(linkedTable) {
        const recordIds = record.fields[fieldName]
        let linked = Cytosis.getLinkedRecords(recordIds, linkedTable, true)
        if (linked.length > 0)
          results = results.concat(linked)
        else
          // results.concat(record.fields[fieldName])
          results.push(record.fields[fieldName])
      }
      else 
        results.push(record.fields[fieldName])
    }
    return results
  }

  // gets a unique list of values for the entire given field (column)
  // e.g. used for Single and Multiple Select lists, this gets every option
  // Input:
  //    recordArray: an array of Airtable records
  //    field: the name of the field to get (string, ex: 'Tags')
  // Output:
  //    an array of values (NOT an array of Airtable objects)
  static getFieldValues(recordArray, field) {
    let results = []
    // console.log(`Getting the ${field} contents of`, recordArray)
    for (let record of recordArray) {
      const recordValue = record.fields[field]

      // if the value's an array, it's a multiple list, so we break it up
      if (Array.isArray(recordValue)) {
        for (let rV of recordValue) {
          if(!results.find(r => r == rV)) {
            results.push(rV)
          }
        }
      } else {
        if(!results.find(r => r == recordValue)) {
          results.push(recordValue)
        }
      }
    }
    return results
  }


  // turns an array of Airtable records into an array of record names
  // useful for creating filter lists, etc.
  // Input:
  //    recordArray: an array of Airtable records
  // Output:
  //    an array of names (string values; NOT an array of Airtable objects)
  static getNames(recordArray) {
    let results = []
    for (let record of recordArray) {
      if(record)
        results.push(record.fields['Name'])
    }
    return results
  }


  // similar to getNames and getFieldValues but w/ arbitrary fieldname and null filtering & deduplication
  // fieldName is a string
  // useful for getting a list of 
  static getFields(recordArray, fieldName) {
    let results = []

    for (let record of recordArray) {
      if(record.fields && record.fields[fieldName])
        results.push(record.fields[fieldName])
    }
    // deduplicate fields
    return this.deduplicate(results)
    // return results
  }


  // adds "preset" API and Base keys for future instances
  // Input:
  //    airKey, airBase, tables, and tableQuery ;)
  // Output:
  //    nothing, but after Cytosis.configure, every time Cytosis is instantiated w/o options
  //    these will be used
  static configure({airKey, airBase, tables, tableQuery, options}) {
    Cytosis.airKey = airKey;
    Cytosis.airBase = {id: airBaseId};
    Cytosis.airBase.tables = tables || []
    Cytosis.airBase.tableQuery = tableQuery || 'tables';
    Cytosis.airBase.options = options || 'Grid view';
  }



  // Splits an object into many parts to be stored to Airtable
  // stores them as JSON; useful for using Airtable as a "data warehouse"
  // 
  // Takes an Airtable record object { ... data ..., 'hugeField': {tons of data} }
  // and breaks it into multiple chunks (Airtable has a size limit of 100,000 chars for Long Text fields)
  // *** Requires the key-1, key-2, ... fields to exist in Airtable as Long Text columns
  // *** Requires enough chunks, as the API can't create new fields
  // *** Each chunk is 1-indexed!!!!
  // 
  // Input:
  //    record: Airtable record object (unstringified!)
  //    key: field/column name 
  // Output:
  //    Changes the original record so that 
  //    record = {
  //      hugeField: {chunks: i, chunkSize: #} // JSON.stringified and saved into the key field
  //      hugeField-1: chunk 1  // these are saved right into the record, so when an Airtable save will save these straight into a field
  //      hugeField-2: chunk 2
  //      ...
  //    }
  static split(record, key, maxChunks=4, chunkSize=100000) {
    // TODO: convert confusing while loops into [...Array(5).keys()] and iterate for ... of like Python range()
    let itemString = JSON.stringify(record.fields[key])
  
    // if the key (e.g. _data) doesn't exist, just return the object
    if (itemString === undefined)
      return record 
    
    // too big? split the output into an array and into columns _data-1, -2, -3 etc
    // originally if a item was small it wouldn't get split, but that introduced data irregularities
    // if( itemString.length >= chunkSize) {
      let parts = []
      let i = 0
      let length = itemString.length

      while (length>0) {
        parts.push(itemString.substr(i*chunkSize,chunkSize))
        length -= chunkSize
        i++
      }
      // save the metadata into the original key
      // _data stores the metadata
      record.fields[key] = JSON.stringify({
        chunks: i,
        chunkSize: chunkSize,
      })

      let j = 0
      if(i < maxChunks) { // hard limit 
        while (j < i) {
          record.fields[`${key}-${j+1}`] = parts[j]
          j++
        }
      } else {
        throw new Error(`[Cytosis] — couldn’t split record "${record.fields.Name}" — not enough chunks`)
      }
    // }
    return record
  }




  // Takes a split record and merges it together, removing the metadata in the process
  // Takes all the hugeField-1
  // The result will look like the original, too-long record
  // Input:
  //    record: The Airtable record w/ the split data
  //    key: The name of the field to unsplit (String)
  // Output:
  //    record: The Airtable record w/ the original key/data
  static unsplit(record, key) {
    // a split record will always have chunks and chunkSize
    // return the record if it doesn't have a split

    if(!record.fields[key] || !JSON.parse(record.fields[key]).chunks)
      return JSON.parse(record.fields[key])

    const chunks = JSON.parse(record.fields[key]).chunks
    let itemString = ''
    let i=0

    while (i<chunks) {
      itemString += record.fields[`${key}-${i+1}`]
      delete record.fields[`${key}-${i+1}`] // remove the chunked partials for memory
      i++
    }

    const data = JSON.parse(itemString)
    // originally just returned the unsplit data
    // return JSON.parse(itemString)
    // now replaces metadata w/ regular data so the object doesn't "appear" mutated to user
    // the record deletes the chunked partials
    record.fields[key] = data
    return record
  }


  // deduplicate an array of anything (useful for generating list outputs)
  // Input: array of Airtable records
  // Output: array of unique Airtable records
  static deduplicate(recordArray) {
    return recordArray.filter((val, i, arr) => (arr.indexOf(val) == i))
  }

  // Sorts an array of Airtable objects by a given column, A>Z
  // This is sort of just an example on how to sort, as it doesn't really do a whole lot
  // Input:
  //    recordArray: an array or Airtable records
  //    sortBy: field/column to sort values by
  //    sortFn: a sort function
  static sort(recordArray, sortBy='Name', sortFn=undefined) {
    recordArray.sort(sortFn || function(a,b) {
      var nameA = a.fields[sortBy].toUpperCase(); // ignore upper and lowercase
      var nameB = b.fields[sortBy].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) { return -1 }
      if (nameA > nameB) { return 1 }
      return 0;
    })
    return recordArray;
  }


  // only let Airtable object arrays through that contain the string, in the given fields
  // multiple fields e.g. searchByArray = ['Name','Hosts'], will search both
  // requires cytosis to search through linked fields
  // Input:
  //    str: search string
  //    sourceArray: array of records you're looking through
  //    searchByArray: array of field/column names e.g. ['Name','Tags']
  //    linkedTableArray: array of Airtable arrays; sources for any linked columns, e.g. for tags
  // Output:
  //    array of filter-searched Airtable objects
  static search(str, sourceArray, searchByArray, linkedTableArray=[]) {
    if(!str)
      return sourceArray // pass through if no search string; simplifies chaining

    return sourceArray.filter(function(obj) {
      let searchterm = str.toLowerCase()
      for (let field of searchByArray) {
        // console.log('search', str, obj.get(field) )
        if(obj.fields[field]) {
          if(typeof(obj.fields[field]) == 'string') {
            if (obj.fields[field].toLowerCase().includes(searchterm)) return true
          }
          else if(Array.isArray(obj.fields[field])) {
            // if it's an array of strings (e.g. multiple list)
            // linked records are also a list of strings, so we have to check for a string match
            // every time we see an array
            for (let strField of obj.fields[field]) {
              if (strField.toLowerCase().includes(searchterm)) return true
            }

            if (linkedTableArray.length > 0) {
              for (let linkedTable of linkedTableArray) {
                const records = Cytosis.getLinkedRecords(obj.fields[field], linkedTable, true)
                // console.log('search array', records)
                for (let record of records) {
                  // for linked records, only match against the name
                  if (record.fields['Name'].toLowerCase().includes(searchterm)) return true
                }
              }
            }

          }
        }
      }
      return false // no match

      // return obj.fields.Name && obj.fields.Name.toLowerCase().includes(searchterm) ||
      //       obj.fields.Notes && obj.fields.Notes.toLowerCase().includes(searchterm) ||
      //       obj.fields.Description && obj.fields.Description.toLowerCase().includes(searchterm) ||
      //       obj.fields.URL && obj.fields.URL.toLowerCase().includes(searchterm) ||
      //       obj.fields.Domain && obj.fields.Domain.toLowerCase().includes(searchterm) ||
      //       obj.fields.Authors && obj.fields.Authors.toLowerCase().includes(searchterm)
    })
  }



  // CURRENTLY NOT FUNCTIONAL, and not really a use for it right now
  // joins/combines multiple tables into one new object
  // would be good to have a join (inner), join-left, join-right, outer-join (full) from SQL
  // useful for making combinations for infographics or tables for tallying, etc.
  // takes an array of objects in the form of
  // [{data: (tags object), fields: ['Name', 'Notes']}, {data: (people object), fields: ['Name', 'Tags']}]
  // - fields is optional; leaving it out joins all fields
  // also takes a function that determines the name of each row; if none given, the new object combines the first fields of each object
  // identical field names will be concatenated
  // static join (tables, nameFn=undefined) {
  //   let result = {}

  //   if(!tables || !Array.isArray(tables) || !tables.length < 1)
  //     return undefined
    
  //   tables.map((table) => {
  //     const data = table.data
  //     const fields = table.fields && Array.isArray(table.fields) ? table.fields : undefined

  //     for (let field of fields) {
  //       result[field] = { ...result[field], data[field]} // concatenate if field already exists
  //     }

  //     // define the name transform method
  //     nameFn = nameFn ? nameFn : function(result) {
  //       console.log('namefn result', result)
  //       return result
  //     }

  //     return nameFn(result)
  //   })

  // }


}

export default Cytosis











































/* 

These are pulled from the first experiment w/ ATLX. It mutates the airtable object into indexable/searchable arrays
But w/ Cytosis, they've been supplanted by cytosis.find('')


flatten: function(airtable) {

  // flatten all of airtable to row-level array for easy filtering and manipulation
  // [ {__id: 'Content.home', ...data }]
  const airtableflat = Object.keys(airtable).map(table => {
    // console.log('flatten table:',table)
    var rows = Object.keys(airtable[table]).map(row => {
      // console.log('row data', airtable[table][row])
      let returnObj = airtable[table][row]
      returnObj['__id'] = table + '.' + row
      return returnObj
      // return {__id: table + '.' + row, ...airtable[table][row]} // not supported by some browsers
    })
    return rows
  }).reduce((acc, curValue) => {
    return acc.concat(curValue)
  }, [])

}




// e.g. data-airtable="Content.Home Page.Intro"
// will create an airtable content query for the tab 'Content', the 'Home Page' row, and 'Intro' column
function airtableReplacer(airtable) {
  // console.log('airtable >>> ', airtable['Music']['DJ Khaled']['Notes'])

  // flatten all of airtable to row-level array for easy filtering and manipulation
  // [ {__id: 'Content.home', ...data }]
  const airtableflat = Object.keys(airtable).map(table => {
    // console.log('flatten table:',table)
    var rows = Object.keys(airtable[table]).map(row => {
      // console.log('row data', airtable[table][row])
      let returnObj = airtable[table][row]
      returnObj['__id'] = table + '.' + row
      return returnObj
      // return {__id: table + '.' + row, ...airtable[table][row]} // not supported by some browsers
    })
    return rows
  }).reduce((acc, curValue) => {
    return acc.concat(curValue)
  }, [])

  console.log('Dance CMS:', airtableflat)

  // populate airtable data tags
  $('[data-airtable]').each(function(i) {
    var queries = $(this).data('airtable').split('.')
    // console.log('airtable: ', $(this).data('airtable'), queries)

    // break if unpublished
    let isPublished = airtableflat.filter(item => (
          item.__id == `${queries[0]}.${queries[1]}`
        ))[0].isPublished
    if(!isPublished) return;

    // row result; filter returns an array but we assume the __ids are unique so array will always be len=1
    let result = airtableflat.filter(item => (
      item.__id == `${queries[0]}.${queries[1]}`
    ))[0][queries[2]]

    // old iterative loop before .map/reduce flattening 
    // for (var q in queries) {
    //   var query = queries[q]
    //   // nested looping to get nested objects airtable[query1[query2[query3...]]]

    //   // every airtable row needs an isPublished column / depth=1
    //   if (depth==1 && !result[query].isPublished) {
    //     console.log('test!', result[query].isPublished)
    //     return false;
    //   }

    //   // console.log('in >> ' , result , ' ? ', query)
    //   // if the query is undefined, break the loop
    //   if(result[query] !== undefined) {
    //     result = result[query]
    //     depth++
    //   }
    //   // console.log('test::: ' , queries[q], airtable[queries[q]], result)
    // }


    if (typeof(result) == 'string'){
      // markdown output
      // console.log($(this).data('type'), result)
      if($(this).data('type') == 'raw')
        $(this).html(result) // don't render markdown
      else {
        try {
          $(this).html(md.render(result))
          $(this).find('*').addClass($(this).data('airtable-classes')) // applies data-airtable-classes to all children
        } catch(e){
          console.err(e, ' result:', result)
        }
      }
    } else {
      // handle a bunch of edge cases. these are arrays
      // console.log('edge case:', result)

      // check if array
      if ( result === undefined || !('length' in result) || !(result.length > 0)) {
        console.log('result is not array:', result)
        return;
      }

      // handle array of strings (e.g. references)
      // nested linked query: data = Schedule.FriMain.Venue.LocName
      // Venue is linked to a Venues row, which has LocName
      if (typeof(result[0]) == 'string' ) {
        // if query length = 4 we know these are ref links
        // only go one reference deep for now

        const refs = result; // array of refs; this makes it easier to think about
        let output = ""; 
        // output to be rendered; have to collect output since we're looping arrays
        // we render output by rendering inside and then duplicating the current outer element for the # of instances

        for (let _ref of refs) {
          var ref = airtableflat.filter(item => (item.id == _ref))[0]
          // console.log('strings (ID):', _ref, ref, [queries[3]], ref[queries[3]])
          // console.log('ref (ID):', _ref, [queries[3]], ref[queries[3]])
          try {
            // if there's a linked href, we can attach it; useful for linked url records
            // get the query through the special linkedhref tag
            if($(this).data('airtable-linkedhref'))
              $(this).attr('href', ref[$(this).data('airtable-linkedhref')])

            if($(this).data('type') == 'raw') {
              var elem = $(this).html(ref[queries[3]])
              output +=  $('<div>').append($(elem).clone()).html(); // get outerHtml
            } else { 
              var elem = $(this).html(md.render([queries[3]]))
              output +=  $('<div>').append($(elem).clone()).html(); // get outerHtml
            }
          } catch(e){
            console.error('Reference error, need a column name from:', ref, _ref)
          }
        }        

        // console.log('render::' , output)
        $(this).replaceWith(output)
        return;
      } 
      
      // handle image attachments here
      // how to figure out if an array of attachments
      if ( ('type' in result[0]) ) {
        // console.log('attachments:', result)
        // result[0].type == 'image/jpg'
        // default to only handling first image
        $(this).html(`<img src="${result[0].url}" />`)
        return;
      } 

      // how to figure out if reference
    }
  })

  // populate href tags
  $('[data-airtable-href]').each(function(i) {
    var queries = $(this).data('airtable-href').split('.')
    // console.log('airtable: ', $(this).data('airtable'), queries)

    // break if unpublished
    let isPublished = airtableflat.filter(item => (
          item.__id == `${queries[0]}.${queries[1]}`
        ))[0].isPublished
    if(!isPublished) return;

    // row result; filter returns an array but we assume the __ids are unique so array will always be len=1
    let result = airtableflat.filter(item => (
      item.__id == `${queries[0]}.${queries[1]}`
    ))[0][queries[2]]

    // handle array of strings (e.g. references) / copypasta from above
    
    if (typeof(result) == 'string') {
      $(this).attr('href',result)
    } else if (result !== undefined && typeof(result[0]) == 'string' ) {
      const refs = result;
      for (let _ref of refs) {
        var ref = airtableflat.filter(item => (item.id == _ref))[0]
        $(this).attr('href',ref[queries[3]])
        return;
      }        
    } 
  })
}



*/

// export function Cytosis() {
//   return Cytosis;
// }


