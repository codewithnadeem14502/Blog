import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const PostModal = mongoose.model("post", PostSchema);
export default PostModal;
