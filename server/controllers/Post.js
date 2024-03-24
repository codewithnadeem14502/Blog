import PostModel from "../modals/PostModel.js";

export const Create = async (req, res) => {
  // console.log("file name: " + req.file.filename);
  // console.log(req.file);
  try {
    const respond = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      file: req.file.filename,
      username: req.body.username,
    });
    res.json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const Post = async (req, res) => {
  try {
    const respond = await PostModel.find({});
    res.json(respond);
  } catch (error) {
    console.log(error);
  }
};
export const DetailsPost = async (req, res) => {
  const id = req.params.id;

  try {
    const respond = await PostModel.findById(id);
    res.json(respond);
    // console.log(respond);
  } catch (error) {
    console.log(error);
  }
};
export const EditPost = async (req, res) => {
  const id = req.params.id;

  try {
    const respond = await PostModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: req.body.title,
        description: req.body.description,
      }
    );
    res.json({ message: "Updated Successfully" });
    // console.log(respond);
  } catch (error) {
    console.log(error);
  }
};
export const DeletPost = async (req, res) => {
  const id = req.params.id;

  try {
    const respond = await PostModel.findByIdAndDelete({
      _id: id,
    });
    res.json({ message: "Deleted Successfully" });
    // console.log(respond);
  } catch (error) {
    console.log(error);
  }
};
