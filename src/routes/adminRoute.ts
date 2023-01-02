import { Router } from "express";
import { createNewAdmin, loginAdmin } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.route("/register").post(createNewAdmin);
adminRouter.route("/login").get(loginAdmin);

export default adminRouter;
