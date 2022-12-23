import { Model, DataTypes } from "sequelize";
import { IPost } from "../utils/interface";
import User_Table from "./userModel";
import sequelizeConnection from "../db";

class Post_Table extends Model<IPost> {}

Post_Table.belongsTo(User_Table, {
  foreignKey: "userId",
});

Post_Table.init(
  {
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
  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true }
);

Post_Table.sync();

export default Post_Table;
