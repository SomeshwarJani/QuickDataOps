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

const conenction = mysql.createPool(DATABASE_CONNECT);

conenction.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting MySQL connection:", err);
    throw err;
  }

  console.log("Database connected");

  // Perform any necessary operations with the 'connection' object

  // Release the connection back to the pool when done
  connection.release();
});

export default conenction;
