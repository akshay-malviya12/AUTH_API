import jwt from "jsonwebtoken";
import 'dotenv/config'

const secretKey = "your_secret_key_here";
// const secretKey = process.env.JWT_SECRETKEY;

function authenticateUser(req, res, next) {
  // console.log(process.env)
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("error", err);
    if (err) return res.status(401).json({ message: err.message });
    req.user = decoded;
    next();
  });
}

export default authenticateUser;
