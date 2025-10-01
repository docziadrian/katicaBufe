const express = require("express");
const router = express.Router();

router.get("/kategoria", (req, res) => {
  pool.query("SELECT * FROM kategoria", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(results);
  });
});

module.exports = router;
