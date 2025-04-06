const bcrypt = require("bcrypt");
const pool = require("../db");

exports.register = async (req, res) => {
  const { email, password, role, nama } = req.body;
  console.log(req.body);

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO admin (email, password, role, nama) VALUES ($1, $2, $3, $4)",
      [email, hashed, role, nama]
    );
    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Gagal registrasi", error: err.message });
  }
};