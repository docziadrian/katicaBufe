const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

// Select ALL categories
router.get("/", (req, res) => {
  pool.query("SELECT * FROM kategoria", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).send(results);
  });
});

// Select ONE categorie by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }
  pool.query(`SELECT * FROM kategoria WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

// Post new categorie
router.post("/", (req, res) => {
  const data = req.body;
  const { id, kategoriaNev } = data;
  if (!id || !kategoriaNev) {
    return res
      .status(400)
      .json({ error: "Nem adott meg id-t vagy kategoria nevet." });
  }

  pool.query(
    `INSERT INTO kategoria (kategoriaNev) VALUES (?)`,
    [kategoriaNev],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// Update new categorie
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { kategoriaNev } = data;

  if (!id || !kategoriaNev) {
    return res
      .status(400)
      .json({ error: "Nem adott meg id-t vagy kategoria nevet." });
  }

  pool.query(
    `UPDATE kategoria SET kategoriaNev = ? WHERE id = ?`,
    [kategoriaNev, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send(results);
    }
  );
});

// Delete new categorie
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Nem adott meg id-t." });
  }

  pool.query(`DELETE FROM kategoria WHERE id = ?`, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;

//Külön modul -> statisztikai adatlekérdezés
// /statistics
// hány vevő, hány termék, melyik termékből mennyi?, mennyi lett a bevétel?
// csak egy GET / statistics -> 
//  - customersCount pl.: 25 vásárló
//  - countMoney pl.: 150.000 Ft
//  - product + sale + price -> 10db hotdog 120.000Ft
//  
//