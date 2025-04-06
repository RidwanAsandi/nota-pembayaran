const express = require("express");
const router = express.Router();
const {
  getNota,
  createNota,
  deleteNota,
  updateNota,
} = require("../controllers/notaController");

router.get("/nota", getNota);
router.post("/nota", createNota);
router.delete("/nota/:id", deleteNota);
router.put("/nota/:id", updateNota);

module.exports = router;
