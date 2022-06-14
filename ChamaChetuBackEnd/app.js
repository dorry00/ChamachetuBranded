const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//api routes

const authenticationRoute = require("./routes/auth");
const groupRoute = require("./routes/groups");
const feedbackRoute = require("./routes/feedbacks");
const paymentRoute = require("./routes/payment");
const merrygoroundRoute = require("./routes/merrygorounds");
const callBackRoute = require("./routes/callback");

//accept json data

app.use(express.json());

//connect MongoDb

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected successfully"))
  .catch((err) => {
    console.log(err);
  });

//use api routing

app.use("/api/auth", authenticationRoute);
app.use("/api/groups", groupRoute);
app.use("/api/merrygorounds", merrygoroundRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/payments/mpesa/mycallback/secured", callBackRoute);

// app.use("/api/mpesa", mpesaRoute)

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Backend at ${PORT} `);
});
