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

const connection = mysql.createPool(DATABASE_CONNECT);

connection.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting MySQL connection:", err);
    throw err;
  }

  console.log("Database connected");
  connection.release();
});

export default connection;
