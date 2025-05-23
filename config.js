
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
    console.error('❌ Error connecting to the database:', err);
    return;
  }

  console.log('✅ Connected to the database');

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude DECIMAL(8,5) NOT NULL,
      longitude DECIMAL(8,5) NOT NULL,
      UNIQUE KEY unique_school (name, address, latitude, longitude)
    );
  `;

  db.query(createTableSQL, (err, result) => {
    if (err) {
      console.error('❌ Error creating schools table:', err);
      return;
    }
    console.log('✅ schools table ready.');
  });
});

module.exports = db;
