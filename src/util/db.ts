import {Sequelize} from "sequelize";
import models from "coredb-models";
import {TIMEZONE} from "../const";

//Create Instance
const sequelize: any = new Sequelize(
	process.env.DB_NAME!,
	process.env.DB_USERNAME!,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mariadb",
		logging: false,
		dialectOptions: {
			timezone: TIMEZONE
		}
	}
);

models(sequelize);

export default sequelize;
