const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  pool.query("SELECT * FROM forgalom", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).send(results);
  });
});

// Get ONE forgalom by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`SELECT * FROM forgalom WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// POST new forgalom
router.post("/", (req, res) => {
  const data = req.body;
  const { termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva } =
    data;

  if (
    !termek ||
    !vevo ||
    !kategoriaId ||
    !egyseg ||
    !nettoar ||
    !mennyiseg ||
    !kiadva
  ) {
    return res.status(400).json({ error: "Nem adott meg minden adatot." });
  }

  pool.query(
    `INSERT INTO forgalom (termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// UPDATE forgalom BY ID
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva } =
    data;

  if (
    !id ||
    !termek ||
    !vevo ||
    !kategoriaId ||
    !egyseg ||
    !nettoar ||
    !mennyiseg ||
    !kiadva
  ) {
    return res.status(400).json({ error: "Nem adott meg minden adatot." });
  }

  pool.query(
    `UPDATE forgalom SET termek = ?, vevo = ?, kategoriaId = ?, egyseg = ?, nettoar = ?, mennyiseg = ?, kiadva = ? WHERE id = ?`,
    [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// DELETE forgalom BY ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`DELETE FROM forgalom WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;
