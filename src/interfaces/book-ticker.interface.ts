export interface BookTickerBinanceResponse {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

export interface BookTickerData {
  bidPrice: string;
  askPrice: string;
  midPrice: string;
  updatedTime: Date;
}
