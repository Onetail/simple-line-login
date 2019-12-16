const jwt = require("express-jwt");
const global = require("../../../../assets/global/Global");

module.exports = {
  exec: app => {
    module.exports.domain(app);
  },
  domain: app => {
    app.post(`/login`, (req, res, next) => {
      const { account, password } = req.body;
      if (account === undefined || password === undefined) {
        res.status(400).send({ error: "Bad request!" });
      } else {
        next();
      }
    });
  }
};
