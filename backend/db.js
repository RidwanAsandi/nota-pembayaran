const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notadb",
  password: "root", // ganti sesuai password,
  port: 5432,
});

module.exports = pool;
