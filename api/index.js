import Express from "express";
import sectorRoute from "./routes/sectors.js";
import userDetails from "./routes/userdetails.js";
import editUser from "./routes/edit.js";
import insertData from "./routes/insertData.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import updateData from "./routes/update.js";
import deleteData from "./routes/delete.js";

const app = Express();
//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://quickdataops.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://quickdataops.vercel.app",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use("/api", sectorRoute);
app.use("/api", userDetails);
app.use("/api", editUser);
app.use("/api", insertData);
app.use("/api", updateData);
app.use("/api", deleteData);

app.use(cookieParser());

app.listen(8800, () => console.log("API Working"));
