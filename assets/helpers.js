

// // import Cytosis from 'cytosis'




// // tracks input types for item fields
// export const INPUT_TYPES = {
//   "TEXT":     'TEXT', // input text, generic; default
//   "EMAIL":    'EMAIL', // email input
//   "NUMBER":   'NUMBER', // number input
//   "TEXTAREA": 'TEXTAREA', // text area
//   "RADIO":    'RADIO', // radio button group
//   "CHECKBOX": 'CHECKBOX', // checkbox group        
// }


// // export const test = function() {
// export async function cytosis(env, store) {

//   if(!env || !store) {
//     console.error('Initialize cytosis with env and store')
//     return;
//   }

//   let cytosis
//   // console.log('Get cytosis; check store: ', store)

//   // return a preloaded cytosis to save on data
//   if(!store.state.cytosis) {
//     console.log('startCytosis: ', env)
//     Cytosis.configure({
//       airtableApiKey: env.airtable_api,
//       airtableBaseId: env.airtable_base,
//     });

//     // console.log('configured!')
//     cytosis = await new Cytosis({
//       airtableApiKey: env.airtable_api,
//       airtableBaseId: env.airtable_base,
//     })

//     console.log('Cytosis Loaded:', cytosis)
//     // let obj = { cytosis: cytosis, ...tables }
//     store.commit('setCytosis', cytosis)
//   } else {
//     cytosis = store.state.cytosis
//   }

//   return new Promise(function(resolve, reject) {
//     resolve(cytosis)
//   })

//   // [{data: (tags object), fields: ['Name', 'Notes']}, {data: (people object), fields: ['Name', 'Tags']}]
//   // cytosis.join([{'Alpha': {one: '1', two: '2'}}, {'Alpha': {one: '1', two: '2'}}, ], )

//   // let testRecord = await cytosis.get('recvV3NDQZCQZ8HHY')
//   // console.log('Testing get id:', testRecord)

//   // // let saveRecord = await cytosis.save({Name:'Testing!'}, 'Phages')
//   // // console.log('Testing save id:', saveRecord)

//   // // await cytosis.delete('Phages', 'rec2K9yJV1TLqasI3')

//   // let findString = await cytosis.find('Labs.CCRC.Phages.Curator')
//   // console.log('Finding string:', findString)

// }



// // only let unique values through any array
// export function deduplicate(array) {
//   return array.filter((val, i, arr) => (arr.indexOf(val) == i))
// }

// // only let airtable object arrays through that contain the string, in the given fields
// // multiple fields e.g. fields = ['Name','Hosts'], will search both
// // requires cytosis to search through linked fields
// export function search(str, array, fields, cytosis) {
//   if(!str)
//     return array // pass through if no search string; simplifies chaining

//   return array.filter(function(obj) {
//     let searchterm = str.toLowerCase()
//     for (let field of fields) {
//       // console.log('search', str, obj.get(field) )
//       if(obj.fields[field]) {
//         if(typeof(obj.fields[field]) == 'string') {
//           if (obj.fields[field].toLowerCase().includes(searchterm)) return true
//         }
//         else if(Array.isArray(obj.get(field))) {
//           const records = cytosis.getLinkedRecords(obj.get(field), cytosis.tables[field], true)
//           // console.log('search array', records)
//           for (let record of records) {
//             // for linked records, only match against the name
//             if (record.get('Name').toLowerCase().includes(searchterm)) return true
//           }
//         }
//       }
//     }
//     return false // no match

//     // return obj.fields.Name && obj.fields.Name.toLowerCase().includes(searchterm) ||
//     //       obj.fields.Notes && obj.fields.Notes.toLowerCase().includes(searchterm) ||
//     //       obj.fields.Description && obj.fields.Description.toLowerCase().includes(searchterm) ||
//     //       obj.fields.URL && obj.fields.URL.toLowerCase().includes(searchterm) ||
//     //       obj.fields.Domain && obj.fields.Domain.toLowerCase().includes(searchterm) ||
//     //       obj.fields.Authors && obj.fields.Authors.toLowerCase().includes(searchterm)
//   })
// }

// // sort airtable object arrays A>Z
// export function sort(array) {
//   return array.sort((a,b) => {
//     var nameA = a.fields.Name.toUpperCase(); // ignore upper and lowercase
//     var nameB = b.fields.Name.toUpperCase(); // ignore upper and lowercase
//     if (nameA < nameB) { return -1 }
//     if (nameA > nameB) { return 1 }
//     return 0;
//   })
// }


// // given an array of airtable objects, get an array of a certain field
// // e.g. get a combined, flat array from the Tags field of each object
// export function getFieldsOf(array, fieldName) {
//   let results = []
//   // console.log('fOf', array, fieldName)
//   array.map((val, i) => {
//     // console.log('fOf val', val, val.fields)
//     if(val.fields && val.fields[fieldName])
//       results = [...results, ... val.fields[fieldName]]
//   })
//   // console.log('fieldsOf:', results)
//   return results
// }



