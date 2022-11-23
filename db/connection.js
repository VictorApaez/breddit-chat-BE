import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL, {
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
