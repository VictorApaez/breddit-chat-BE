import mongoose from "mongoose";

const PORT = process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/chat";
mongoose
  .connect(PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Error connection to DB: " + err);
  });

mongoose.connection.on("disconnected", () =>
  console.log(`Disconnected from MongoDB!`)
);

mongoose.connection.on("error", (error) =>
  console.error(`MongoDB connection error: ${error}`)
);

export default mongoose.connection;
