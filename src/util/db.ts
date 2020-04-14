import {Sequelize} from "sequelize";
import models from "coredb-models";
import credentials from "../../credentials.json"

//Create Instance
const sequelize: any = new Sequelize(
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

export default sequelize;
