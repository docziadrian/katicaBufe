const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.get("/", (req, res) => {
  // Statisztikák a forgalom táblából:
  // - hány vevő (vevo)
  // - hány termék (termek)
  // - mennyi lett a bevétel (SUM(nettoar * mennyiseg))
  // - termékenként mennyiség és összérték

  const summarySql = `
    SELECT
      COUNT(vevo) AS customersCount,
      SUM(mennyiseg) AS productsCount,
      COALESCE(SUM(nettoar * mennyiseg), 0) AS revenue 
    FROM forgalom
  `; // COALESCE -> a NULL érték kezelése -> az első nem NULL értéket adja vissza
  // Itt 0-t ad vissza, mivel a tablakban NULL lenne

  // Visszadja: customersCount, productsCount, revenue


  const productsSql = `
    SELECT
      termek,
      SUM(mennyiseg) AS quantity,
      COALESCE(SUM(nettoar * mennyiseg), 0) AS total
    FROM forgalom
    GROUP BY termek
    ORDER BY termek
  `;

  pool.query(summarySql, (err, summaryResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    pool.query(productsSql, (err2, productsResults) => {
      if (err2) {
        return res.status(500).json({ error: err2.message });
      }

      const summary = summaryResults && summaryResults[0]
        ? summaryResults[0]
        : { customersCount: 0, productsCount: 0, revenue: 0 };

      res.status(200).json({
        osszesVasarlo: Number(summary.customersCount) || 0,
        osszesTermek: Number(summary.productsCount) || 0,
        vegosszeg: Number(summary.revenue) || 0,
        termekek: (productsResults || []).map((r) => ({
          termek: r.termek,
          mennyiseg: Number(r.quantity) || 0,
          ar: Number(r.total) || 0,
        })),
      });
    });
  });
});

module.exports = router;
