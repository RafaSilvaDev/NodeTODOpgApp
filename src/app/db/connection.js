import mysql from "mysql";
import dotenv from "dotenv"
dotenv.config();

export const conn = mysql.createPool({
  connectionLimit: 10, 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const operation = (sql, values = "") => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (error, result) => {
      if (error) return reject(error);
      return resolve(JSON.parse(JSON.stringify(result)));
    });
  });
};
