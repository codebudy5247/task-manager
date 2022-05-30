const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const connectDB = require("./db");

const app = express();

app.use(logger("dev"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("APIs Up && running");
});
app.use('/api',require('./routes/user'))
app.use('/api/project',require('./routes/project'))
app.use('/api/task',require('./routes/task'))

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
