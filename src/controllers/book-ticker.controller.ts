import { bookTickerDB } from "../db/book-ticker.db";
import { catchAsync } from "../utils/catch-async";

export const bookTickerController = catchAsync(async (_, res, next) => {
  const data = bookTickerDB.data;

  res.status(200).json(data);
});
