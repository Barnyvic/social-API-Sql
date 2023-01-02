import { Router } from "express";
import { createNewAdmin, getAllUsers } from "../controllers/adminController";
import { authMiddleware, verifyAdmin } from "../middleware/authMiddleware";

const adminRouter = Router();

adminRouter.route("/register").post(createNewAdmin);

adminRouter.route("/getusers").get(authMiddleware, verifyAdmin, getAllUsers);

export default adminRouter;
