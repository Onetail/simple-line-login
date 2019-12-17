const service = require("../service/shop.service");
module.exports = {
  exec: app => {
    module.exports.domain(app);
  },
  domain: app => {
    app.get("/shop", async (req, res) => {
      const result = await service.findAll();
      res.send(result);
    });
    app.post("/shop", async (req, res) => {
      const { name, phone, address, principal } = req.body;
      const result = await service.insertOne(name, address, phone, principal);
      res.send(result.insertedId);
    });
    app.put("/shop/:id", async (req, res) => {
      const { id } = req.params;
      const { name, phone, address, principal } = req.body;
      const dto = {
        shopName: name,
        shopPhone: phone,
        shopAddress: address,
        shopPrincipal: principal
      };
      const result = await service.updateOne(id, dto);

      res.send("ok");
    });
    app.delete("/shop/:id", async (req, res) => {
      const { id } = req.params;
      const result = await service.deleteOne(id);
      res.send(result);
    });
  }
};
