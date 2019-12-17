const shop = require('./shop.module.js') 
const account = require("./account.module");

module.exports = {
  exec: (app, mongoDB) => {
    module.exports.domain(app, mongoDB);
  },
  domain: (app, mongoDB) => {
    shop.exec(app, mongoDB) 
    account.exec(app, mongoDB);
  }
};
