require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

const frontendPath = path.join(__dirname, "../../dist");
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Connected to database, tables synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));