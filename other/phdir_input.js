/*

  Webtask module — just a sample here

  This writes phage directory content to the airtable base PhDir Input
  Eventually it'll be moved to firebase or prisma, but it's easy for now
  - keeps the private keys secret; uses Cytosis as a middle man
  - somewhat slow, but whatever

  published at
  https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input
  
  ## todo
  
  ## done

*/

_ = require('lodash');
url = require('url');
http = require('http');
https = require('https');

// https://github.com/auth0/webtask-tools
const Express = require('express');
const Webtask = require('webtask-tools');
const server = Express();

const Cytosis = require('cytosis').default;

const writeArticle = function( res, article ) {
  if(article) {
    res.write(
      "<html><head><meta charset='utf-8'><title>"
      + article.title
      + "</title></head><body>"
      + article.content
      + "</body></html>");
  } 
};



server.use(Express.json());

// parse object to string and write the respose
const writeJSON = function( res, obj ) {
  let objJSON;
  // is an object 
  // yes: parse to a string
  // if not, set it to empty object
  if(typeof(obj) === 'object') {
    objJSON = JSON.stringify(obj);
  } else {
    objJSON = '{}';
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write( objJSON );
};


const finish = function(res, req, paper) {
  if(req.query.html == 'true') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    writeArticle(res, paper.article);
  } else {
    writeJSON(res, paper);
  }
  res.end();
};

function loadCytosis(req) {
  const cytosis = new Cytosis({
    airtableApiKey: req.webtaskContext.secrets.cytosis_api,
    airtableBaseId: req.webtaskContext.secrets.phdir_base,
  });
  return cytosis;
}



// main entry
server.post('/', function(req, res) {
  console.log('payload:', req.body, ' > ', Express.json())
  var body = unescape(req.body.data)
  loadCytosis(req).then((cytosis) => {
    console.log('Cytosis Loaded:', cytosis);
    // const obj = {
    //   Name: 'Testing!',
    //   Feedback: 'Ahoy there matey',
    // }
    const obj = req.body
    cytosis.save(obj, 'Feedback')
    
    writeJSON(res, {success: true})
    res.end();
  });
})

/*
server.post('/', function(req, res) {
  var body = unescape(req.body.data)
  getContent = req.query.content;
  
  // console.log('server post, body:' , req.body)
  console.log('Getting page w/ posted server data', getContent)
  try {
    getPaperFromSrc(body, req.query.url).then(function(paper) {
      if(paper.doi) {
        console.log('getting citations...');
        getCitations(paper.doi).then(function(citations) {
          paper['citations'] = citations;
          finish(res, req, paper);
        });
      } else {
        console.log('no citations!!', paper)
        res.send(paper);
      }
    })
  } catch(e) {
    console.error('error getting post content', e)
    res.end()
  }
})
*/

module.exports = Webtask.fromExpress(server);
