

export function loadStatic(env, store, routeName='') {
  let data
  if(store.state && !!!store.state.Content) {
    console.log('load cytosis: static')
    data = store.cache.dispatch('loadCytosis', {
      env,
      tableIndex: 'static',
      caller: routeName
    })
  }
  return data
}


export function loadDynamic(env, store, routeName='') {
  let data
  if(store.state && !!!store.state.Organizations) {
    console.log('load cytosis: dynamic')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableIndex: 'dynamic',
      caller: routeName
    })
  }
  return data
}


export function loadNews(env, store, routeName='') {
  let data
  if(store.state && !!!store.state['C&T']) {
    console.log('load cytosis: news')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableIndex: 'capsid',
      caller: routeName
    })
  }
  return data
}