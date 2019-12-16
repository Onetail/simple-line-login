module.exports = {
  Server: {
    SERVERHTTPPORT: process.env.SERVER_PORT || 8501,
    SERVERHTTPSPORT: 443,
    JWTSECRET: "abc123"
  },

  Database: {
    MYSQLDATABASEIP: process.env.MYSQL_HOST || "127.0.0.1",
    MONGODATABASEIP: process.env.MONGO_HOST || "127.0.0.1",
    DATABASEUSER: "root",
    DATABASEPASSWORD: process.env.MYSQL_ROOT_PASSWORD || "root",
    MYSQLDATABASENAME: "ServerModel",
    MONGOPORT: process.env.MONGO_PORT || 27017
  }
};
