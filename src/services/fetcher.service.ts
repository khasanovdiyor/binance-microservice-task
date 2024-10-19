import { AppError } from "../utils/app-error";

export async function fetchDataEvery<T>(
  numberOfSeconds: number,
  fetcherFn: () => Promise<T>,
  handlerFn: (data: T) => void
) {
  const milliSeconds = numberOfSeconds * 1000;
  let interval: NodeJS.Timeout;

  try {
    const data = await fetcherFn();
    handlerFn(data);
    interval = setInterval(async () => {
      const data = await fetcherFn();
      handlerFn(data);
    }, milliSeconds);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new AppError("Cannot fetch book ticker data from binance", 503);
  }

  // Return an object with a cancel function to stop the interval
  function cancel() {
    clearInterval(interval);
  }

  return {
    cancel,
  };
}
