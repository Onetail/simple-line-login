const service = require("../service/account.service");

module.exports = {
  exec: app => {
    module.exports.domain(app);
  },
  domain: app => {
    app.post("/login", (req, res) => {
      const { account, password } = req.body;

      res.send(service.checkAccountAndPassword(account, password));
    });
  }
};
