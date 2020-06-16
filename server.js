const express = require("express");
const cors = require("cors");
const path = require("path");
const keyFiles = require("./config/keys.js");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Importing Routes
const users = require("./routes/Users.js");

//App Routes
app.get("/", (req, res) => {
  res.send("Welcome to Chat Application");
});

app.use("/api/users", users);

//DB Configuration
const db = keyFiles.mongoURI;

//Connecting To DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
mongoose.connection.on("disconnected", (err) => {
  console.log("DB disconnected");
});

// Port Configuration
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running at ${port}`);
