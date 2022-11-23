import db from "./db/connection.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

db.on("connected", () => {
  console.log("Connected to MongoDB!");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
