import db from "./db/connection.js";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT;

db.on("connected", () => {
  console.log("Connected to MongoDB!");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
