module.exports = {
  exec: app => {
    module.exports.domain(app);
  },
  domain: app => {
    /*
     * app.get('/', (req, res, next) => {
     *   next();
     * })
     */
    app.post("/shop", async (req, res, next) => {
      const { name, phone, address, principal } = req.body;
      if (!name || !phone || !address || !principal) {
        res.status(400).send({ error: "Bad request!" });
      } else {
        next();
      }
    });
    app.put("/shop/:id", async (req, res, next) => {
      const { id } = req.params;
      const { name, phone, address, principal } = req.body;
      if (id === undefined) {
        throw res.status(400).send({ error: "Bad request!" });
      }
      if (!name && !phone && !address && !principal) {
        res.status(400).send({ error: "Bad request!" });
      } else {
        next();
      }
    });
    app.delete("/shop/:id", async (req, res, next) => {
      const { id } = req.params;

      if (id === undefined) {
        throw res.status(400).send({ error: "Bad request!" });
      } else {
        next();
      }
    });
  }
};
