import multer from "multer";
import { upload } from "./multer.js";

export const uploadMiddleware = (req, res, next) => {
  upload.single("avatar")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: 400, message: err.message });
    } else if (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    next();
  });
};
