const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController");

router.post("/register", async (req, res) => {
  console.log("Request register masuk:", req.body);
  try {
    const result = await register(req, res);
    console.log("Register success:", result);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
