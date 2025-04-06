const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const loginRoutes = require("./routes/login");
const crudRoutes = require("./routes/crud");

app.use("/api", loginRoutes);
app.use("/api", crudRoutes);

app.get("/", (req, res) => {
  res.send("server aktif");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
