const Sequelize = require("sequelize");
const models = require("@alleshq/coredb-models");

// Create Instance
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mariadb",
		logging: false,
		dialectOptions: {
			timezone: "Etc/GMT0"
		}
	}
);
models(sequelize);
module.exports = sequelize;
