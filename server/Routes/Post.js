import express from "express";
import {
  Create,
  DeletPost,
  DetailsPost,
  EditPost,
  Post,
} from "../controllers/Post.js";
import { isAuth } from "../middlewars/isAuth.js";
import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/create", isAuth, upload.single("file"), Create);
router.get("/", Post);
router.get("/detailpost/:id", DetailsPost);
router.post("/editpost/:id", EditPost);
router.delete("/deletepost/:id", DeletPost);
export default router;
