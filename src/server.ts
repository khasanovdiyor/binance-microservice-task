import app from "./app";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception! 💥 shutting down...");
  process.exit(1);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = app.listen(port, () => {
  console.log(`App is running at port: `, port);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection! 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
