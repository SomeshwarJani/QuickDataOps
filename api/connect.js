import mysql from "mysql";

const DATABASE_CONNECT = {
  host: "bxka49jlb5vqk7bsekub-mysql.services.clever-cloud.com",
  user: "u05zepe8u9omexoa",
  password: "u05zepe8u9omexoa",
  database: "bxka49jlb5vqk7bsekub",
  waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const connection = mysql.createConnection(DATABASE_CONNECT);
