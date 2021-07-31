// MongoDB connection
const mongoose = require("mongoose");
// const config = require("config");
// const keys = require("./default.json");

// const db = get("mongoURI");

const db= "mongodb://zacker:zacker2910@cluster0-shard-00-00.k31l1.azure.mongodb.net:27017,cluster0-shard-00-01.k31l1.azure.mongodb.net:27017,cluster0-shard-00-02.k31l1.azure.mongodb.net:27017/DevConnector?ssl=true&replicaSet=atlas-14icwk-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(console.log("MongoDB connected!"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
