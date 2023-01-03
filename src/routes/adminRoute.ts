import { Router } from "express";
import {
  changeUserRole,
  createNewAdmin,
  getAllUsers,
} from "../controllers/adminController";
import { authMiddleware, verifyAdmin } from "../middleware/authMiddleware";

const adminRouter = Router();

adminRouter.route("/register").post(createNewAdmin);

adminRouter.route("/getusers").get(authMiddleware, verifyAdmin, getAllUsers);

adminRouter
  .route("/updaterole/:id")
  .patch(authMiddleware, verifyAdmin, changeUserRole);

export default adminRouter;
