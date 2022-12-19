import express from "express";
import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = express();

    //Application-level middleware funcitons
    server.use(express.json());

    //Route-specific middleware functions
    server.use(express.static("./public"));

    // Error handling middleware function
    server.use(errorHandlerMiddleware);

    // Not found middleware function
    server.use(notFound);

    const PORT = process.env.PORT || 8000;

    http.createServer(server).listen(PORT, function () {
      console.info("Server is listening on:", this.address());
    });
  } catch (error) {
    console.log(error);
  }
};

start();
