const express = require("express");
const router = express.Router();

router.get("/forgalom", (req, res) => {
  pool.query(
    "SELECT * FROM forgalom INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId",
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      res.send(results);
    }
  );
});

module.exports = router;
