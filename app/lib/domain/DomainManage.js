const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const path = require("path");

const global = require(path.join(__dirname, "../../../assets/global/Global"));
const mongoDB = require(path.join(
  __dirname,
  "../../../assets/database/mongoDB"
));
const message = require(path.join(
  __dirname,
  "../../../assets/message/MessageActivity"
));
const appModule = require(path.join(__dirname, "./module/app.module.js"));
const http = require("http").createServer(app);

var server = {
  http: null,
  https: null
};

module.exports = {
  exec: async () => {
    app.use(bodyparser());
    await module.exports.databaseMethod();

    setTimeout(() => {
      module.exports.defaultRoute();
      module.exports.createModuleMethod(app, mongoDB);
    }, 1000);
  },

  createModuleMethod: (app, mongoDB) => {
    appModule.exec(app, mongoDB);
  },

  databaseMethod: async () => {
    const mongo = require("mongodb");
    await mongoDB.exec(mongo);
  },
  defaultRoute: () => {
    app.use(express.static("html", { root: "/" }));
  },

  listen: () => {
    server.http = http.listen(global.Server.SERVERHTTPPORT, () => {
      message.success(1, global.Server.SERVERHTTPPORT);
    });
  },
  close: () => {
    process.exit(0);
  }
};
