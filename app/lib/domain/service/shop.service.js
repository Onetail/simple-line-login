var ObjectID = require("mongodb").ObjectID;
var mongo = "";
let Database_Name = "LineLogin";
const table = "shops";
module.exports = {
  exec: async (app, mongoDB) => {
    await module.exports.initializeValue(mongoDB);
  },
  initializeValue: mongoDB => {
    mongo = mongoDB.getValue();
  },
  findAll: () => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .find({})
      .toArray();
  },
  insertOne: (shopName, shopAddress, shopPhone, shopPrincipal) => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .insertOne({
        shopName,
        shopPhone,
        shopAddress,
        shopPrincipal
      });
  },
  updateOne: (id, dto) => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .updateOne(
        {
          _id: ObjectID(id)
        },
        {
          $set: { ...dto }
        }
      );
  },
  deleteOne: id => {
    return mongo
      .db(Database_Name)
      .collection(table)
      .deleteOne({
        _id: ObjectID(id)
      });
  }
};
