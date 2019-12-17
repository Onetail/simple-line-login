const table = "users";
var mongo = "";
let Database_Name = "LineLogin";
module.exports = {
  exec: async (app, mongoDB) => {
    await module.exports.initializeValue(mongoDB);
  },
  initializeValue: mongoDB => {
    mongo = mongoDB.getValue();
  },
  checkAccountAndPassword: (account, password) => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .findOne({
        account: account,
        password: password
      });
  },
  insertOne: (account, password) => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .insertOne({
        account: account,
        password: password
      });
  }
};
