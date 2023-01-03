import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../config/config";

v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
});

const parser = multer({
  storage,
  limits: {
    fileSize: 5120 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});

export default parser;
