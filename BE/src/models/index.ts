import { Sequelize } from "sequelize";
import { Config } from "../types/types";
import ConfigData from "../../config/config.json";
import ssss from "../config/config";
import { User } from "./User";

const env = process.env.NODE_ENV || "development";
const configs: Config = ConfigData;
const config = configs[env];

interface DB {
    [key: string]: any;
    sequelize?: Sequelize;
}
  
const db: DB = {};
  
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password === null ? undefined : config.password,
    {
      host: config.host,
      dialect: "mysql",
      timezone: "+09:00",
    }
);
  
db.sequelize = sequelize;
  
export default sequelize;

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db.sequelize = sequelize;

// module.exports = db;