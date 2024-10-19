import express from "express";
import { AppError } from "./utils/app-error";
import router from "./routes/routes";
import { globalErrorController } from "./controllers/error.controller";
import { fetchBookTickerData, handleBookTickerData } from "./services/book-ticker.service";
import { fetchDataEvery } from "./services/fetcher.service";

const app = express();
app.use("/api", router);

let updateFrequencyInSeconds = parseInt(process.env.UPDATE_FREQUENCY_IN_SECONDS ?? "");
updateFrequencyInSeconds = isNaN(updateFrequencyInSeconds) ? 10 : updateFrequencyInSeconds;

const symbol = "BTCUSDT";

fetchDataEvery(updateFrequencyInSeconds, () => fetchBookTickerData(symbol), handleBookTickerData);

// handle routes that are not defined
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// handle app errors
app.use(globalErrorController);

export default app;
