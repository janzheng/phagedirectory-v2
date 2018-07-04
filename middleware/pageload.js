
export default function (context) {
  const routeName = context.route.name;
  const store = context.store;
  // console.log('pageload ctx:', context);

  if(routeName != 'phages' && routeName != 'labs') {
  // console.log('clear search.');
    store.dispatch('update', 
      {search: {
          string: '',
          url: ''
        }
      }
    )
  }

  // clear search if we're not on a directory page

  // If the user is not authenticated
  // if (!store.state.authenticated) {
  //   return redirect('/login')
  // }
}