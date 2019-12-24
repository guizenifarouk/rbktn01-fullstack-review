const express = require('express');
const bodyParser = require('body-parser');
const helper = require("../helpers/github");
const db = require("../database/index");

let app = express();

app.use(express.static(__dirname + '/../client/dist'));


//
app.use(bodyParser.json());


app.post('/repos', function (req, res) {

  var username = req.body.username;
 
  db.findRepo(username)
  .then((data)=>{
    return new Promise((resolve,reject)=>{
      if(data.length===0){
        resolve(data)
      }else{
         res.send(data);
      }
    })
  })
  .then((data)=>{
    return helper.getReposByUsername(username)
  })
  .then((repos)=>{
    return db.saveAll(repos);
  })
  .then((repos)=>{
      res.send(repos.ops)
  })
  .catch((err)=>{
    console.log("err",err)
    //res.send("server error")
  })
 
});

app.get('/repos', function (req, res) {
  db.findRepo()
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    console.log("err get data ",err)
    res.send([]);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

