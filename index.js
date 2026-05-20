const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const cors = require("cors");

const express = require("express");

const connectDB = require("./db");

require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
app.use(express.json());

// Middleware to handle CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

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
