require('dotenv').config({path: './env/.env'});

const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const apiUserRouter = require("./routes/apiRoutes/userRoute");
const apiAuthRouter = require("./routes/apiRoutes/authRoute");
const apiCatwayRouter = require("./routes/apiRoutes/catwayRoute");
const apiReservationRouter = require("./routes/apiRoutes/reservationRoute");
const authMiddleware = require('./middlewares/auth');
const homeRouter = require('./routes/viewRoutes/viewRoutes');

const app = express();

app.use(express.json());

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

app.use("/api/auth", apiAuthRouter);
app.use("/api/user", authMiddleware.verifyToken, apiUserRouter);
app.use("/api/catways", authMiddleware.verifyToken, apiCatwayRouter);
app.use("/api/catways/:id/reservations", authMiddleware.verifyToken, apiReservationRouter);