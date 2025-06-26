//PATHS
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//utils
import connectDB from "./Utils/db_config.js";
import reviewRoutes from "./Routes/ReviewRoutes.js";
import propertyRoutes from "./Routes/propertyRoutes.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Must be a specific origin, not '*'
    credentials: true, // Allow credentials (cookies, auth headers)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/reviews", reviewRoutes);
app.use("/api/property", propertyRoutes);

app.listen(port, () => {
  console.log(`successfully running on ${port}`);
});
// export default function handler(req, res) {
//   app(req, res);
// }
