import { Model, DataTypes } from "sequelize";

import { IPost } from "../utils/interface";
import sequelizeConnection from "../db";
import USERS from "./userModel";

class POST extends Model<IPost> {
  static associate(model: any) {
    POST.belongsTo(model.USERS);
  }
}

POST.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    Topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    view_Count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    like: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "Posts",
  }
);

POST.sync();

export default POST;
