import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import userRouter from "./Routes/User.js";
import postRouter from "./Routes/Post.js";
import { isAuth } from "./middlewars/isAuth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URI)
  // .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => console.log(`DataBase is connected ${PORT}`));

// middle ware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: ["https://quillify-iota.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
app.use((req, res, next) => {
  res.cookie("sameSiteCookie", "value", { sameSite: "none", secure: true });
  next();
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
//app.use(isAuth);

app.get("/", (req, res) => {
  res.send("Welcome to my blog server!");
});
app.listen(PORT, () => {
  console.log("Server is working");
});
