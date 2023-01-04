import { Model, DataTypes, ForeignKey } from "sequelize";

import { IPost } from "../utils/interface";
import sequelizeConnection from "../db";
import USERS from "./userModel";
import COMMENT from "./commentModel";

class POST extends Model<IPost> {
  static associate(models: any) {
    POST.hasMany(models.COMMENT, {
      foreignKey: "PostId",
    });
  }
}

// this configures the `userId` attribute.

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
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "Posts",
  }
);

POST.belongsTo(USERS, {
  foreignKey: "userId",
});

POST.sync();

export default POST;
