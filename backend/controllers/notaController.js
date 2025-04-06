const pool = require("../db");

exports.getNota = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM nota");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

exports.createNota = async (req, res) => {
  const { nama_pelanggan, barang, jumlah, harga_satuan } = req.body;
  const total = jumlah * harga_satuan;

  try {
    await pool.query(
      "INSERT INTO nota (nama_pelanggan, barang, jumlah, harga_satuan, total) VALUES ($1, $2, $3, $4, $5)",
      [nama_pelanggan, barang, jumlah, harga_satuan, total]
    );
    res.status(201).json({ message: "Nota berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan nota" });
  }
};

exports.deleteNota = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM nota WHERE id = $1", [id]);
    res.json({ message: "Nota berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus nota" });
  }
};

exports.updateNota = async (req, res) => {
  const { id } = req.params;
  const { nama_pelanggan, barang, jumlah, harga_satuan } = req.body;
  const total = jumlah * harga_satuan;

  try {
    await pool.query(
      "UPDATE nota SET nama_pelanggan = $1, barang = $2, jumlah = $3, harga_satuan = $4, total = $5 WHERE id = $6",
      [nama_pelanggan, barang, jumlah, harga_satuan, total, id]
    );
    res.json({ message: "Nota berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengupdate nota" });
  }
};
