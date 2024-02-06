import pg from "pg";
import dotenv from "dotenv";
const { Client } = pg;
dotenv.config();

const conn = new Client(process.env.DB_URL);

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
