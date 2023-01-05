import { Router } from "express";

import {
  createPost,
  likeAPost,
  uploadPostImage,
  viewAPost,
  viewAllPost,
} from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import parser from "../middleware/cloudinary";

const postRouter = Router();

postRouter.route("/createpost").post(authMiddleware, createPost);
postRouter.route("/posts").get(authMiddleware, viewAllPost);
postRouter.route("/post/:id").get(authMiddleware, viewAPost);
postRouter
  .route("/uploadimage/:id")
  .patch(authMiddleware, parser.single("image"), uploadPostImage);

postRouter.route("/postlike/:id").patch(authMiddleware, likeAPost);

export default postRouter;
