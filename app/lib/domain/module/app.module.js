const account = require("./account.module");

module.exports = {
  exec: (app, mongoDB) => {
    module.exports.domain(app, mongoDB);
  },
  domain: (app, mongoDB) => {
    account.exec(app, mongoDB);
  }
};
