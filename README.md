## How to run the project

Using docker:

1. Clone the project & go to project folder
2. Create `.env` file in the root folder like `.env.example`
3. Build the image with `docker build -t book-ticker .`
4. Run container from the image `docker run -v $(pwd)/.env:/usr/src/app/.env -p 3000:3000 book-ticker`
   Note: we need `.env` file to be present in container so we pass it when running the container.
5. Now go to `localhost:3000/api/bookTicker`
