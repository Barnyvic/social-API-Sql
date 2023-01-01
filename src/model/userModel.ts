import {
  DataTypes,
  Model,
  Optional,
  HasManyCreateAssociationMixin,
  Association,
} from "sequelize";

import sequelizeConnection from "../db/index";
import { IUser } from "../utils/interface";
import POST from "./PostModel";

type UserCreationAttributes = Optional<IUser, "id">;

class USERS extends Model<IUser, UserCreationAttributes> {
  static associate(models: any) {
    USERS.hasMany(models.POST, {
      foreignKey: "userId",
    });
  }
}

USERS.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length",
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["User", "Admin"],
      defaultValue: "User",
      allowNull: false,
      validate: {
        isIn: {
          args: [["User", "Admin"]],
          msg: "Invalid role",
        },
      },
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    // indexes: [{ unique: true, fields: ["Email"] }],
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "Users",
  }
);

// This method will create model if the model does not exist, however, if already exist it would overwrite it.
USERS.sync();

export default USERS;
