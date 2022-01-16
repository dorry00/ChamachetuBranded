// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();
// const authenticationRoute = require("./routes/auth");
// const groupRoute = require("./routes/groups");
// const feedbackRoute = require("./routes/feedbacks");
// const paymentRoute = require("./routes/payment")

// //accept json data

// app.use(express.json());

// //connect MongoDb

// mongoose
//   .connect(
//    process.env.MONGO_URL
//   )
//   .then(() => console.log("MongoDb connected successfully"))
//   .catch((err) => {
//     console.log(err);
//   });

// //api routing

// app.use("/api/auth", authenticationRoute);
// app.use("/api/groups", groupRoute);
// app.use("/api/feedback", feedbackRoute);
// app.use("/api/payments", paymentRoute)

// const PORT = 5000
// app.listen(process.env.PORT || PORT, () => {
//   console.log(`Backend at ${PORT} `);
// });

function ArrayPlusDelay(array, delegate, delay) {
  var i = 0
  
   // seed first call and store interval (to clear later)
  var interval = setInterval(function() {
    	// each loop, call passed in function
      delegate(array[i]);
      
        // increment, and if we're past array, clear interval
      if (i++ >= array.length - 1)
          clearInterval(interval);
  }, delay)
  
  return interval
}

var inter = ArrayPlusDelay(['x','y','z'], function(obj) {console.log(`This is ${obj}`)},2000)