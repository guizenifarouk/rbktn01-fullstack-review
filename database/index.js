const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  repo_name: String,
  // owner: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newRepo = new Repo({

    repo_id: repo.id,
    repo_name: repo.name,
    // owner: repo.owner.login,

  })

newRepo.save((err,data) => {
  if(err) {
    console.log('erroooooor')
  } else {
    console.log('GJ , success')
  }
})
}
let returnedRepos = () => {
  Repo.find().limit(25)
}

module.exports.returnedRepos = returnedRepos;
module.exports.save = save;