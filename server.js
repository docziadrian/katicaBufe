const express = require("express");
const cors = require("cors");
const kategoriak = require("./modules/kategoriak");
const forgalom = require("./modules/forgalom");

const mysql = require("mysql");
const app = express();

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "2025_katicabufe",
});

// Middlewarek
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bajai SZC Türr István Technikum.");
});

app.use("/kategoria", kategoriak);
app.use("/forgalom", forgalom);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
