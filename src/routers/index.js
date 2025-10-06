import { Router } from "express";
import subscriptionsRouter from "./subscriptions.js";
import categoriesRouter from "./categories.js";
import termsRouter from "./terms.js";
import authRouter from "./auth.js";

const router = Router();

const API_URL_PREFIX = "/api";

router.use(`${API_URL_PREFIX}/subscriptions`, subscriptionsRouter);
router.use(`${API_URL_PREFIX}/categories`, categoriesRouter);
router.use(`${API_URL_PREFIX}/terms`, termsRouter);
router.use(`${API_URL_PREFIX}/auth`, authRouter);

export default router;
