import { Router } from "express";
import subscriptionsRouter from "./subscriptions.js";
import categoriesRouter from "./categories.js";
import termsRouter from "./terms.js";

const router = Router();

router.use("/api", subscriptionsRouter);
router.use("/api", categoriesRouter);
router.use("/api", termsRouter);

export default router;
