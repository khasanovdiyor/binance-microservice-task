import { Router } from "express";
import { bookTickerController } from "../controllers/book-ticker.controller";

const router = Router();

router.route("/bookTicker").get(bookTickerController);

export default router;
