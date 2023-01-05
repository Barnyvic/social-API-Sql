import { Model, DataTypes, ForeignKey } from "sequelize";

import { IComment } from "../utils/interface";
import sequelizeConnection from "../db";
import USERS from "./userModel";
import POST from "./PostModel";

class COMMENT extends Model<IComment> {}

COMMENT.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, tableName: "Comment" }
);

COMMENT.belongsTo(USERS, { foreignKey: "userId", targetKey: "id" });
COMMENT.belongsTo(POST, { foreignKey: "PostId", targetKey: "id" });

COMMENT.sync();

export default COMMENT;
