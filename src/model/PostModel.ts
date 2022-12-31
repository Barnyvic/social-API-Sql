import { Model, DataTypes, Optional } from "sequelize";
import { IPost } from "../utils/interface";
import User_Table from "./userModel";
import sequelizeConnection from "../db";

type PostCreationAttributes = Optional<IPost, "id">;

class Post_Table extends Model<IPost, PostCreationAttributes> {}

// Post_Table.belongsTo(User_Table, {
//   foreignKey: {
//     name: "userId",
//   },
// });

Post_Table.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
    },
    Topic: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    Body: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    viewCount: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    like: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    retweet: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true }
);

Post_Table.sync();

export default Post_Table;
