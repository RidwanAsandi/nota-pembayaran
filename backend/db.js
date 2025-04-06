const { Pool } = require("pg");

const pool = new Pool({
  user: postgres,
  host: postgres.railway.internal,
  database: notadb,
  password: root,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
