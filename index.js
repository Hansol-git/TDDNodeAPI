import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import "babel-polyfill";
import user from "./api/user";

const app = express();

// middleware
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", user);

export default app;
