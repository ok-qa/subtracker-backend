import { Router } from "express";
import subscriptionsRouter from "./subscriptions.js";

const router = Router();

router.use("/api", subscriptionsRouter);

export default router;
