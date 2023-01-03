const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const storeRouter = require("./routers/stores");

// Load env
dotenv.config({ path: "./config/config.env" });

// connect database
connectDB();

const app = express();
// Parser
app.use(express.json());

// cors
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/api/v1/stores", storeRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
