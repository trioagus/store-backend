import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { webRouter } from "./routes/web";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(webRouter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"), {
    maxAge: "365d",
  })
);

export default app;
