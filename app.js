require('dotenv').config({path: './env/.env'});

const express = require('express');
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URL, {})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error MongoDB :", err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});