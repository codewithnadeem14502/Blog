import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  let token = "";

  try {
    token = req.headers["authorization"];
    // console.log("middleware token ", token);
    if (!token) {
      return res.status(401).json({ message: "No token, no authorization" });
    } else {
      const decoded = jwt.verify(token, "secret");
      req.id = decoded.id;
      req.email = decoded.email;
      req.username = decoded.username;
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized" });
  }
};
