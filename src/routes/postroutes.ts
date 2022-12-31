import { Router } from "express";

import { createPost } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const postRouter = Router();

postRouter.route("/createpost").post(authMiddleware, createPost);

export default postRouter;
