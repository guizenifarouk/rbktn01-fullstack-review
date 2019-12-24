const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName) => {

  return new Promise(function(resolve,reject){

    let options = {
      url: `https://api.github.com/users/${userName}/repos`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };
  
    request(options, function(error, response, body) {
      if (error) {
        console.log('--------Error? really?!');
        reject(error)
  
      } else {
        var array = JSON.parse(body);
        var result = [];
        for(var i = 0 ; i<array.length;i++){
          var obj={}
          obj.userName = userName
          obj.repoName = array[i].name
          obj.url      = array[i].html_url
          result.push(obj);
        }
        resolve(result)
      }
    
  
  })

  })
 
}

module.exports.getReposByUsername = getReposByUsername;