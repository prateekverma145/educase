// const e = require('express');
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    });
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  const sql=`CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(5,5) NOT NULL,
  longitude DECIMAL(5,5) NOT NULL,
  UNIQUE KEY unique_school (name, address, latitude, longitude)
);`
const sql2='DROP TABLE schools;'
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error creating table:', err);
        return;
        }
        console.log(' successfully');
    });
});
module.exports = db;  
