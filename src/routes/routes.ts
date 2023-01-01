import { Router } from "express";
import { Login, createNewUser } from "../controllers/authControler";

const authroutes = Router();

authroutes.route("/register").post(createNewUser);
authroutes.route("/login").get(Login);

export default authroutes;
