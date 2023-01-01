import { Router } from "express";

import { createPost, viewAllPost } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const postRouter = Router();

postRouter.route("/createpost").post(authMiddleware, createPost);
postRouter.route("/allpost").get(authMiddleware, viewAllPost);

export default postRouter;
