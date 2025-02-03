import express from "express";
import dotenv from "dotenv";
import {} from "node:crypto";
import { dbConnect } from "./database/dbConnect.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`App Started on PORT: ${port}`);
});
