const express = require('express');
const bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js').getReposByUsername;
let save = require('../database/index.js').save;
let returnedRepos = require('../database/index.js').returnedRepos;
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // let username = req.body.username
  console.log(req.body.term)
getReposByUsername(req.body.term)
.then(res => {save(res.body)})
.then(res.end(res.body))
.catch(error => { console.log(error)})
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
 returnedRepos()
 .then(res.end('Gj, stp testing ,start working'))
 .catch(error => {console.log('error')})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

