import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import userRouter from "./Routes/User.js";
import postRouter from "./Routes/Post.js";
import { isAuth } from "./middlewars/isAuth.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import GoogleOAuth2Strategy from "passport-google-oauth2";
import UserModal from "./modals/User.js";
import jwt from "jsonwebtoken";

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
    origin: [process.env.HOST_URL],
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
app.use(
  session({
    secret: process.env.SECERT,
    resave: false,
    saveUninitialized: false,
  })
);
//  passport initialization
app.use(passport.initialize());
app.use(passport.session());
function generateRandomPassword() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Passport Configuration
passport.use(
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Passport callback function
      // You can handle user creation or authentication logic here
      try {
        let user = await UserModal.findOne({ googleId: profile.id });
        // console.log("Profile ", profile);
        if (!user) {
          user = new UserModal({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            img: profile.photos[0].value,
            password: generateRandomPassword(),
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
//app.use(isAuth);

// initial google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
const URL = process.env.HOST_URL;
// call back url from which we going to hit
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.HOST_URL,
    failureRedirect: `${URL}/login`,
  })
);

// user from  {
//   _id: '6604bc031c4984eba5a07120',
//   googleId: '115397764607968598669',
//   username: 'md nadeem',
//   email: 'mdnadeem14502@gmail.com',
//   img: 'https://lh3.googleusercontent.com/a/ACg8ocI0PdJkDTJaLFlF-GyErIrzdAgyPY88IElmfp11c8dAGb0=s96-c',
//   __v: 0
// }

app.get("/login/sucess", async (req, res) => {
  console.log("user from ", req.user);
  const user = req?.user;
  if (user) {
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      "secret"
    );
    // console.log("Token ", token);
    res.status(200).json({ message: "user Login", token });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});
app.get("/", (req, res) => {
  res.send("Welcome to my blog server!");
});
app.listen(PORT, () => {
  // console.log(process.env.HOST_URL);
  console.log("Server is working");
});
