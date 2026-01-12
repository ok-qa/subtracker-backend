import { ONE_DAY } from "../constants/index.js";
import {
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from "../services/auth.js";
import { env } from "../utils/env.js";
import { generateAuthUrl } from "../utils/googleOAuth2.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: "User successfully logged in!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  const allowedOrigins = env("ALLOWED_ORIGINS").split(",");
  const requestOrigin = req.get("origin");

  const clientUrl = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  await requestResetToken(req.body.email, clientUrl);
  res.json({
    message: "Reset password email was successfully sent!",
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: "Password was successfully reset!",
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const {state} = req.query;
  const url = generateAuthUrl(state);

  res.redirect(url);
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.query.code);
  req.session.oauthAccessToken = session.accessToken;
  console.log("loginWithGoogleController session.accessToken: ", session.accessToken);
  console.log("loginWithGoogleController req.session: ", req.session);
  setupSession(res, session);

  const {state} = req.query;

  const decoded = Buffer.from(state, 'base64').toString('utf-8');
  const data = JSON.parse(decoded);

  res.redirect(`${data.frontend}/oauth/success`);

};

export const OAuthTokenController = async (req, res) => {
  console.log("OAuthTokenController req.session: ", req.session);
  const session = req.session;
  if (!session || !session.oauthAccessToken) {
    return res.json({
      status: 401,
      message: "No access token",
    });
  }
  const token = session.oauthAccessToken;
  delete session.oauthAccessToken;

  res.json({ accessToken: token });
};
