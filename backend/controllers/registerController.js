const bcrypt = require("bcrypt");
const pool = require("../db");

exports.register = async (req, res) => {
  const { email, password, role, nama } = req.body;
  console.log("Register Request:", req.body);

  try {
    // Cek apakah email sudah digunakan
    const existing = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);
    console.log("Check user:", checkUser.rows);

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password dan simpan
    const hashed = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    await pool.query(
      "INSERT INTO admin (email, password, role, nama) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashed, role, nama]
    );

    console.log("User created:", result.rows[0]);

    res
      .status(201)
      .json({ message: "Registrasi berhasil", result: result.rows[0] });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Gagal registrasi", error: err.message });
  }
};
