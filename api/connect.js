import mysql from "mysql";

const DATABASE_CONNECT = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const connection = mysql.createConnection(DATABASE_CONNECT);
