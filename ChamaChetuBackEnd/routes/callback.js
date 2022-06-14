const router = require("express").Router();
const Payment = require("../Models/Payment");

router.post("/", async (req, res) => {
  let MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  let CheckoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  // let metadata = req.body.Body.stkCallback.callbackMetadata
  let amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value;
  let transaction_id = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value;
  let date = req.body.Body.stkCallback.CallbackMetadata.Item[2].Value;
  let PhoneNumber = req.body.Body.stkCallback.CallbackMetadata.Item[3].Value;
  let timestamp = new Date(2018, 11, 24, 10, 33, 30, 0);

  const payment = new Payment({
    MerchantRequestID: MerchantRequestID,
    CheckoutRequestID: CheckoutRequestID,
    amount: amount,
    timestamp: timestamp,
    phone: PhoneNumber,
  });

  try {
    const savedpayment = await payment.save();
    if (!savedpayment) {
      console.log("could not save payment");
    }
    return res.status(200).json("transaction successfully saved");
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
