const mongoose = require('mongoose')
const mongoUri = 'mongodb://127.0.0.1/SocialApp'
// I added the data 
// const User= require('../module/User.js');
// const Post= require('../module/Post.js');
const{ users, posts } =require('../data/index.js')

mongoose
  .connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    /* add data one time */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.log(err))
const db = mongoose.connection
const getAll = () => {}

module.exports = {
  db,
  getAll
}
