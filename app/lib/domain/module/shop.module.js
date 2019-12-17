const shopService = require("../service/shop.service.js");
const shopMiddleware = require("../middleware/shop.middleware.js");
const shopController = require("../controller/shop.controller.js");

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
    shopController.exec(app);
  },
  middleware: app => {
    shopMiddleware.exec(app);
  },
  service: (app, mongoDB) => {
    shopService.exec(app, mongoDB);
  }
};
