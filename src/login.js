import { Router } from "express";
import db from "./database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();
const secretKey = "your_secret_key_here";

// Login.......
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  // Check if email exists.........
  db.query("SELECT * FROM auth WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const user = rows[0];
    console.log(user.password, password)
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    //Compare password if match return true......
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      console.log("hi", result)
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      }

      //Generate JWT forauthentication.........
      const token = jwt.sign(
        { id: user.password.length, email: user.email },
        secretKey,
        { expiresIn: "5h" }
      );

      // Update token in DataBase.......
      db.query(
        "UPDATE auth SET token = ? WHERE email = ?",
        [token, user.email],
        (updateErr) => {
          if (updateErr) {
            console.error("Token update error:", updateErr);
            return res.status(500).json({ message: "Token update failed" });
          }
          return res
            .status(200)
            .json({ message: "Login successful", token: token });
        }
      );
    });
  });
});

export default router;

