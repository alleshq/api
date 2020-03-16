const credentials = require("../credentials");
const Sequelize = require("sequelize");
const models = require("coredb-models");

//Create Instance
const sequelize = new Sequelize(
	credentials.db.name,
	credentials.db.username,
	credentials.db.password,
	{
		host: credentials.db.host,
		dialect: "mariadb",
		logging: false,
		dialectOptions: {
			timezone: "Etc/GMT0"
		}
	}
);
models(sequelize);
module.exports = sequelize;
