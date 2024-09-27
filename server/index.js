const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "reserve-tickets_db",
  multipleStatements: true,
});

// 新規登録 メールアドレス確認
app.post("/confirm/userEmail", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const value = [req.body.email];
  con.query(sql, value, function (err, result) {
    if (err) {
      return res.json("Error");
    }
    if (result.length > 0) {
      return res.json("Failed");
    } else {
      return res.json(result);
    }
  });
});

// 新規登録
app.post("/users", (req, res) => {
  const sql =
    "INSERT INTO users( userID, userName, email, password ) VALUES (0, ?, ?, ?)";
  const values = [req.body.userName, req.body.email, req.body.password];
  con.query(sql, values, function (err, result) {
    if (err) {
      return res.json("Error");
    }
    return res.json(result);
  });
});

// ログイン
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];
  con.query(sql, values, function (err, result) {
    if (err) {
      return res.json("Error");
    }
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json("Failed");
    }
  });
});

// チケット情報
app.get("/api/get/tickets", (req, res) => {
  const sql = `SELECT * FROM tickets as T1
      INNER JOIN places as T2
      ON T1.placeID = T2.placeID
    `;
  con.query(sql, function (err, result, fields) {
    if (err) {
      return res.json("Error");
    }
    return res.json(result);
  });
});

// チケット購入
app.post("/purchases", (req, res) => {
  const sql =
    `INSERT INTO purchases( purchaseID, ticketID, userID, numberOf ) VALUES (0, ?, ?, ?);
      UPDATE tickets SET purchased = purchased + ${req.body.numberOf} WHERE ticketID = ${req.body.ticketID}`;
  const values = [req.body.ticketID, req.body.userID, req.body.numberOf];
  con.query(sql, values, function (err, result) {
    if (err) {
      return res.json("Error");
    }
    return res.json(result);
  });
});

// チケット購入情報
app.get("/api/get/purchases/:id", (req, res) => {
  const sql = `
      SELECT
        T2.ticketName,
        T2.startTime,
        T2.endTime,
        T3.placeName,
        T3.address,
        T2.cost,
        T1.numberOf
      FROM purchases as T1 INNER JOIN
      (tickets as T2
      INNER JOIN places as T3
      ON T2.placeID = T3.placeID)
      ON T1.ticketID=T2.ticketID
      WHERE T1.userID = ${req.params.id};
    `;
  con.query(sql, function (err, result, fields) {
    if (err) {
      return res.json("Error");
    }
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
