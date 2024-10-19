import { bookTickerDB } from "../db/book-ticker.db";
import { BookTickerBinanceResponse } from "../interfaces/book-ticker.interface";
import { AppError } from "../utils/app-error";

/**
 * Fetch book ticker data from binance
 *
 * @param symbol
 * @returns Book ticker data
 * @throws Error
 */
export const fetchBookTickerData = async (symbol: string): Promise<BookTickerBinanceResponse> => {
  const res = await fetch(`https://data-api.binance.vision/api/v3/ticker/bookTicker?symbol=${symbol}`);

  const data: BookTickerBinanceResponse = await res.json();

  return data;
};

export const handleBookTickerData = (data: BookTickerBinanceResponse) => {
  const now = new Date();
  console.log("Updating book ticker data at", now);

  const { askPrice, bidPrice } = data;

  let serviceCommissionInPercentage = parseInt(process.env.SERVICE_COMMISSION_IN_PERCENTAGE ?? "");
  serviceCommissionInPercentage = isNaN(serviceCommissionInPercentage) ? 0.01 : serviceCommissionInPercentage;

  const serviceCommission = serviceCommissionInPercentage / 100;

  const bidWithCommission = parseFloat(bidPrice) * (1 - serviceCommission);
  const askWithCommission = parseFloat(askPrice) * (1 + serviceCommission);

  const midPrice = (bidWithCommission + askWithCommission) / 2;

  bookTickerDB.data = {
    bidPrice: bidWithCommission.toFixed(2),
    askPrice: askWithCommission.toFixed(2),
    midPrice: midPrice.toFixed(2),
    updatedTime: now,
  };
};
