const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "postgres.railway.internal",
  database: "railway",
  password: "cBGfLfIoYiENZEIynbMhrttbKdSgMMaS", // ganti sesuai password
  port: 5432,
});

module.exports = pool;
