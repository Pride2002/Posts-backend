const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");

const connectDB = require("./db");

require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Posts API");
});

//user routes
app.use("/users", userRoutes);

//post routes
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

connectDB();
