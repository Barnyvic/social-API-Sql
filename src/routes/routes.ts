import { Router } from "express";
import { createNewUser } from "../controllers/authControler";

const authroutes = Router();

authroutes.route("/register").post(createNewUser);

export default authroutes;
