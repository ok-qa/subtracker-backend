import multer from "multer";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";

const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    err.message = "Only .jpg, .jpeg, .png, .gif files are allowed";
    cb(err);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter,
});
