const credentials = require("../credentials");
const Sequelize = require("sequelize");
const models = require("../coredb-models");

//Create Instance
const sequelize = new Sequelize(credentials.db.name, credentials.db.username, credentials.db.password, {
    host: credentials.db.host,
    dialect: "mariadb"
});
models(sequelize);
module.exports = sequelize;