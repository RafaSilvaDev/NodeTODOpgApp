import pg from "pg";
import dotenv from "dotenv";
const { Client } = pg;
dotenv.config();

const conn = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:true,
});

conn.connect();

export const operation = async (sql, values = "") => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (error, result) => {
      if (error) return reject(error);
      return resolve(JSON.parse(JSON.stringify(result.rows)));
    });
  });
};

export default conn;
