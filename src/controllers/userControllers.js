import createHttpError from "http-errors";
import { updateUser } from "../services/user.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const patchUserController = async (req, res, next) => {
  try {
    const protocol = req.protocol; // http or https
    const host = req.get("host"); // localhost:5000 or my-api.com
    const fullUrl = `${protocol}://${host}`; // complete base URL

    const avatar = req.file;

    let avatarUrl;

    if (avatar) {
      avatarUrl = await saveFileToUploadDir(avatar, fullUrl);
    }

    const result = await updateUser(req.user._id, {
      ...req.body,
      avatar: avatarUrl,
    });

    if (!result) {
      next(createHttpError(404, "User not found")); //TODO: change error message to the actual one(from error.message)
      return;
    }

    res.json({
      status: 200,
      message: `Successfully patched a user!`,
      data: result.user,
    });
  } catch (err) {
    console.error(err);
    next(createHttpError(err.status || 500, err.message || "Server error"));
  }
};

export const getUserController = async (req, res, next) => {
  const { user } = req;

  res.json({
    status: 200,
    message: `Successfully found a user!`,
    data: user,
  });
};
