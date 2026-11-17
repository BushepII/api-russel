require('dotenv').config({path: './env/.env'});

const express = require('express');
const mongoose = require("mongoose");

const apiUserRouter = require("./routes/apiRoutes/userRoute")
const apiAuthRouter = require("./routes/apiRoutes/authRoute")

const app = express();

app.use(express.json());

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is nto defined');
}

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL is not defined');
}

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
)
.catch((err) => console.error("Error MongoDB :", err));

app.use("/api/user", apiUserRouter);
app.use("/api/auth", apiAuthRouter);