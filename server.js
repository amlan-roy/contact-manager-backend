import express, { json } from "express";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import contactRoutesRouter from "./routes/contactRoutes.js";
import { connectDb } from "./config/dbConnection.js";
const dotenvConfig = dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(json());

// Routes
app.use("/api/contacts", contactRoutesRouter);

// Error handlerss
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on port" + port);
});
