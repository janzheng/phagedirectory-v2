

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

  // render orgs

  // render phages
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
      $(tmp_host).text(phage);
      tmp_person.find('.directory-hosts').append($(tmp_host));
    });

  $('.person-list').append(tmp_person);

  // var tmp_org = $('.template-org');
  // var tmp_host = $('.template-host');
}













