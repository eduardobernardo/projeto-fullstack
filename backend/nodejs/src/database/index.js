const mongoose = require("mongoose");
require("dotenv").config();

//Configuracoes do MongoDB
const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
console.log("URI", uri);
mongoose.connect(uri)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error');
    console.error(err);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;