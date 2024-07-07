const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const { syncDatabase } = require("./config/syncDatabase");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const questionRoutes = require("./routes/questions");
const testRoutes = require("./routes/tests");

const app = express();

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);

syncDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
