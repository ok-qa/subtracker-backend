import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { updateUserSchema } from "../validation/user.js";
import {
  deleteUserController,
  getUserController,
  patchUserController,
} from "../controllers/userControllers.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.use(authenticate);

router.patch(
  "/",
  uploadMiddleware,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.get("/", ctrlWrapper(getUserController));

router.delete("/", ctrlWrapper(deleteUserController));

export default router;
