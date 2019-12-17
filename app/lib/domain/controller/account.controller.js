const service = require("../service/account.service");

module.exports = {
  exec: app => {
    module.exports.domain(app);
  },
  domain: app => {
    app.post("/login", async (req, res) => {
      const { account, password } = req.body;

      const isExist = await service.checkAccountAndPassword(account, password);
      if (!isExist) {
        await service.insertOne(account, password);
        const result = await service.checkAccountAndPassword(account, password);
        res.send(result);
      } else {
        res.send(isExist);
      }
    });
  }
};
