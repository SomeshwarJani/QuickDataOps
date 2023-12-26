import mysql from "mysql";

const DATABASE_CONNECT = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_data",
};

export const connection = mysql.createConnection(DATABASE_CONNECT);
