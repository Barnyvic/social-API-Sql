import { Router } from "express";

import {
  createPost,
  uploadPostImage,
  viewAllPost,
} from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import parser from "../middleware/cloudinary";

const postRouter = Router();

postRouter.route("/createpost").post(authMiddleware, createPost);
postRouter.route("/allpost").get(authMiddleware, viewAllPost);
postRouter
  .route("/uploadimage/:id")
  .patch(authMiddleware, parser.single("image"), uploadPostImage);

export default postRouter;
