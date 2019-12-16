const accountController = require("../controller/account.controller");
const accountMiddleware = require("../middleware/account.middleware");
const accountService = require("../service/account.service");

module.exports = {
  exec: (app, mongoDB) => {
    module.exports.domain(app, mongoDB);
  },
  domain: async (app, mongoDB) => {
    await module.exports.middleware(app);
    await module.exports.controller(app);
    await module.exports.service(app, mongoDB);
  },
  controller: app => {
    accountController.exec(app);
  },
  middleware: app => {
    accountMiddleware.exec(app);
  },
  service: (app, mongoDB) => {
    accountService.exec(app, mongoDB);
  }
};
