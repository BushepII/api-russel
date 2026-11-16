require('dotenv').config({path: './env/.env'});

const express = require('express');
const mongoose = require("mongoose");

const apiRouter = require("./routes/apiRoutes/userRoute")

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
)
.catch((err) => console.error("Error MongoDB :", err));

app.use("/api", apiRouter);