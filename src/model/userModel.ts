import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../db/index";
import { IUser } from "../utils/interface";

type UserCreationAttributes = Optional<IUser, "id">;

class User_Table extends Model<IUser, UserCreationAttributes> {}

User_Table.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

// This method will create model if the model does not exist, however, if already exist it would overwrite it.
User_Table.sync();

export default User_Table;
