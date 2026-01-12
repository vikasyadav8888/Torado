import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT2 || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// CHECK CONNECTION
async function testDB() {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL Connected Successfully!");
    conn.release();
  } catch (err) {
    console.error("Database Connection Failed: ", err.message);
  }
}

testDB();

export default pool;
