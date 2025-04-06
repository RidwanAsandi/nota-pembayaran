import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
    nama: "",
  });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", form);
      setSuccess("Registrasi berhasil! Silakan login.");
      setForm({ email: "", password: "", role: "", nama: "" });
      alert("registrasi berhasil");
      navigate("/");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Gagal registrasi");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
