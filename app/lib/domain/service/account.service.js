const table = "users";
let mongo = "";
let Database_Name = "LineLogin";
module.exports = {
  exec: async (app, mongoDB) => {
    await module.exports.initializeValue(mongoDB);
  },
  initializeValue: mongoDB => {
    mongo = mongoDB.getValue();
  },
  checkAccountAndPassword: (account, password) => {
    mongo
      .db(Database_Name)
      .collection(table)
      .findOne(
        {
          account: account,
          password: password
        },
        (err, result) => {
          if (err) throw err;
          if (result === null) res.send(false);
          else res.send(true);
        }
      );
  }
};
