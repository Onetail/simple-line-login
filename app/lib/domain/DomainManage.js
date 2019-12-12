const app = require("express")();

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

const http = require("http").createServer(app);

var server = {
  http: null,
  https: null
};

module.exports = {
  exec: () => {
    app.use(bodyparser());
    module.exports.databaseMethod();
  },

  databaseMethod: () => {
    const mongo = require("mongodb");
    mongoDB.exec(mongo);
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
