import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotaCetak from "../components/notaCetak";
import { useNavigate } from "react-router-dom";

function Nota() {
  const [form, setForm] = useState({
    nama_pelanggan: "",
    barang: "",
    jumlah: "",
    harga_satuan: "",
  });

  const [notaList, setNotaList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const printRef = useRef();
  const [notaToPrint, setNotaToPrint] = useState(null);
  const navigate = useNavigate();

  const fetchNota = async () => {
    const res = await axios.get("http://localhost:5000/api/nota");
    setNotaList(res.data);
  };

  useEffect(() => {
    fetchNota();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`http://localhost:5000/api/nota/${editId}`, form);
      setIsEdit(false);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/nota", form);
    }

    setForm({ nama_pelanggan: "", barang: "", jumlah: "", harga_satuan: "" });
    fetchNota();
  };

  // handler edit
  const handleEdit = (nota) => {
    setForm({
      nama_pelanggan: nota.nama_pelanggan,
      barang: nota.barang,
      jumlah: nota.jumlah,
      harga_satuan: nota.harga_satuan,
    });
    setIsEdit(true);
    setEditId(nota.id);
  };

  // hendler delete
  const handleDelete = async (id) => {
    if (confirm("Yakin mau hapus nota ini?")) {
      await axios.delete(`http://localhost:5000/api/nota/${id}`);
      fetchNota();
    }
  };

  const handleCetak = (nota) => {
    setNotaToPrint(nota);

    // delay saat print nota
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Apakah mau Logout ?");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Nota Pembayaran</h1>
        <button
          onClick={() => handleLogout()}
          className="bg-red-600 text-white px-2 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-2">
        <input
          type="text"
          placeholder="Nama Pelanggan"
          className="input"
          value={form.nama_pelanggan}
          onChange={(e) => setForm({ ...form, nama_pelanggan: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Barang"
          className="input"
          value={form.barang}
          onChange={(e) => setForm({ ...form, barang: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Jumlah"
          className="input"
          value={form.jumlah}
          onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Harga Satuan"
          className="input"
          value={form.harga_satuan}
          onChange={(e) => setForm({ ...form, harga_satuan: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>

      <div className="mt-6">
        {notaList.map((nota) => (
          <div key={nota.id} className="border p-4 mb-2 rounded shadow">
            <p>
              <strong>Nama:</strong> {nota.nama_pelanggan}
            </p>
            <p>
              <strong>Barang:</strong> {nota.barang}
            </p>
            <p>
              <strong>Jumlah:</strong> {nota.jumlah}
            </p>
            <p>
              <strong>Harga Satuan:</strong> Rp{nota.harga_satuan}
            </p>
            <p>
              <strong>Total:</strong>{" "}
              <span className="text-green-600 font-bold">Rp{nota.total}</span>
            </p>
            <p className="text-sm text-gray-500">
              {new Date(nota.tanggal).toLocaleString()}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(nota)}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(nota.id)}
                className="bg-red-600 text-white px-2 py-1 rounded text-sm"
              >
                Hapus
              </button>
              {/* <button
                onClick={() => handleCetakPdf(nota)}
                className="bg-green-600 text-white px-2 py-1 rounded text-sm"
              >
                Cetak PDF
              </button> */}
              <button
                onClick={() => handleCetak(nota)}
                className="bg-green-600 text-white px-2 py-1 rounded text-sm"
              >
                Cetak Nota
              </button>
            </div>
            <NotaCetak ref={printRef} nota={notaToPrint} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nota;
