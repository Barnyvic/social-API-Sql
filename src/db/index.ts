import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("databese is connected.....");
  })
  .catch((error) => {
    console.log(error);
  });

export default sequelizeConnection;
