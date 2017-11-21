

/*

      Directory Data Loader

      - build the lists
      - feed them into list.js for search and sorting
      - tabs will eventually need to be list.js filters instead of tabs
      
*/


// $(document).ready(function() {
//   console.log(
//     // '- site loaded -',
//     // organizations,
//     // profiles,
//     // roles,
//   )
// })


// render the data to the directory
// raw render
function render_raw(profiles) {
  // reset the container lists
  $('.person-list').html('');
  console.log('> Raw Render', profiles)

  // render profiles
  profiles.raw.forEach(function(item) {
    render_profile(item);
  });


// _.sortBy(users, [function(o) { return o.user; }]);

  // render hosts
  // var hosts = convert_hosts(profiles.raw);
  // Object.keys(hosts).forEach(function(host) {
  //   console.log(host + ':',hosts[host]);
  //   // render_host(host);
  // });
}

// render a PROFILE
// map item to the html
// for all views
// combined with list js?
function render_profile(item) {
  // skip if publish state is false 
  if(item.system.published == false) {
    return false;
  }

  // console.log('::: rendering: ', item); // , $('.person-list').html());
  var tmp_person = $('#template-person').clone();
    tmp_person.removeAttr('id');
    tmp_person.find('.person-img').hide(); // no images for now
    tmp_person.find('.person-name').text(item.name);
    tmp_person.find('.person-organization').text(item.org);
    tmp_person.find('.person-role').text(item.role);

    if( typeof(item.profiles.twitter) != 'undefined' && item.profiles.twitter != '') {
      tmp_person.find('.person-twitter a').attr('href','https://twitter.com/' + item.profiles.twitter.replace(/^@/g,''));
      tmp_person.find('.person-twitter a').text('@' + item.profiles.twitter.replace(/^@/g,'') );
    }
    if( typeof(item.profiles.scholar) != 'undefined' && item.profiles.scholar != '') {
      tmp_person.find('.person-scholar a').attr('href', item.profiles.scholar);
      tmp_person.find('.person-scholar a').text('Google Scholar' );
    }
    if( typeof(item.profiles.researchgate) != 'undefined' && item.profiles.researchgate != '') {
      tmp_person.find('.person-researchgate a').attr('href', item.profiles.researchgate);
      tmp_person.find('.person-researchgate a').text('ResearchGate' );
    }
    if( typeof(item.profiles.orcid) != 'undefined' && item.profiles.orcid != '') {
      tmp_person.find('.person-orcid a').attr('href', 'http://orcid.org/'+item.profiles.orcid);
      tmp_person.find('.person-orcid a').text(item.profiles.orcid);
    }

    tmp_person.find('.directory-item-notes').text(item.system.profile_str);
    
    if( typeof(item.orgs) != 'undefined') {
      tmp_person.find('.org-name').text(item.orgs[0].name + ` (${item.orgs[0].abbr})`);
    }
    else 
      tmp_person.find('.org-name').text(item.org);
    

    item.pi != '' ? tmp_person.find('.org-pi').text(item.pi) : tmp_person.find('.org-pi').hide();

    // var tmp_host = $('#template-host').clone().removeAttr('id').html('');
    item.phages.forEach(function(phage) {
      var tmp_host = $('#template-host').clone().removeAttr('id').html('');
      // console.log('phage: ' + phage)
      $(tmp_host).html(phage_process(phage));
      tmp_person.find('.directory-hosts').append($(tmp_host));
    });

  $('.person-list').append(tmp_person);
}





// render a HOST
function render_host(item) {
  // console.log('render host: ', item)

  // skip if publish state is false 
  if(item.system.published == false) {
    return false;
  }

  // console.log('::: rendering: ', item); // , $('.person-list').html());
  var tmp_host = $('#template-person').clone();
    tmp_host.removeAttr('id');
    tmp_host.find('.person-img').hide(); // no images for now
    tmp_host.find('.person-name').text(item.name);
    tmp_host.find('.person-organization').text(item.org);
    tmp_host.find('.person-role').text(item.role);

    if( typeof(item.profiles.twitter) != 'undefined' && item.profiles.twitter != '') {
      tmp_host.find('.person-twitter a').attr('href','https://twitter.com/' + item.profiles.twitter.replace(/^@/g,''));
      tmp_host.find('.person-twitter a').text('@' + item.profiles.twitter.replace(/^@/g,'') );
    }
    if( typeof(item.profiles.scholar) != 'undefined' && item.profiles.scholar != '') {
      tmp_host.find('.person-scholar a').attr('href', item.profiles.scholar);
      tmp_host.find('.person-scholar a').text('Google Scholar' );
    }
    if( typeof(item.profiles.researchgate) != 'undefined' && item.profiles.researchgate != '') {
      tmp_host.find('.person-researchgate a').attr('href', item.profiles.researchgate);
      tmp_host.find('.person-researchgate a').text('ResearchGate' );
    }
    if( typeof(item.profiles.orcid) != 'undefined' && item.profiles.orcid != '') {
      tmp_host.find('.person-orcid a').attr('href', 'http://orcid.org/'+item.profiles.orcid);
      tmp_host.find('.person-orcid a').text(item.profiles.orcid);
    }

    tmp_host.find('.directory-item-notes').text(item.system.profile_str);
    
    if( typeof(item.orgs) != 'undefined') {
      tmp_host.find('.org-name').text(item.orgs[0].name + ` (${item.orgs[0].abbr})`);
    }
    else 
      tmp_host.find('.org-name').text(item.org);
    

    item.pi != '' ? tmp_host.find('.org-pi').text(item.pi) : tmp_host.find('.org-pi').hide();

    // var tmp_host = $('#template-host').clone().removeAttr('id').html('');
    item.phages.forEach(function(phage) {
      var tmp_host = $('#template-host').clone().removeAttr('id').html('');
      // console.log('phage: ' + phage)
      $(tmp_host).text(phage_process(phage));
      tmp_host.find('.directory-hosts').append($(tmp_host));
    });

  $('.host-list').append(tmp_host);

}


// add other stuff to phages
function phage_process(phage_str) {
  console.log('process: ' + phage_str, /\(.*?\)/g.test(phage_str))
  return phage_str.replace(/\(.*?\)/g,"<span class='variant'>$&</span>");
  // return phage_str.replace(/\(.*?\)/g,"<span class='var'"+/\(.*?\)/g+"</span>");
  // find variants and add a span around them
  // phage_arr.forEach(function(phage,i){
    // phage_arr[i] = phage.replace(/\(.*?\)/g,"<span class='var'"+/\(.*?\)/g+"</span>")
    // console.log('>> ', phage_arr[i])
  // });
}





function convert_hosts(data) {
  /*
    this setup will have duplicate profiles but that's ok
    in future these will be references to an index

    phages = {
      "Phage name": [profile, profile, profile]
    }
  */
  var phages = {};
  console.log('host convert data: ', data)
  data.forEach(function(profile) {
    // look through phages, add the profile to phages obj
    // if !exist add profile to a new phages obj
    if(profile.system.published != false) {
      profile.phages.forEach(function(phage) {
        if(typeof(phages[phage]) != 'undefined') {
          phages[phage].push(profile)
        } else {
          phages[phage] = [profile];
        }
      });
    }
    // deprecated: building a unique array
    // can be used for testing
    // if(profile.system.published != false) {
    //   phages = _.union(phages, profile.phages);
    // }
  })
  console.log('phages:' , phages);
  return phages;
}









