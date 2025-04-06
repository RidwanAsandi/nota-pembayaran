const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id, email: user.email }, "RAHASIA123", {
      expiresIn: "1h",
    });

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user.id, nama: user.nama },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.register = async (req, res) => {
  const { email, password, role, nama } = req.body;

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
