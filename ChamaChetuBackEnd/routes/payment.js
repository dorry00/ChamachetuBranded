const router = require("express").Router();
const unirest = require("unirest");
const request = require("request");
const moment = require("moment");

router.post("/pay", (req, res) => {
  var token1;

  (consumer_key = "VxPwAMs5ENRBOUmBsttITSgqQcqzrsS1"),
    (consumer_secret = "GqyDqvzG8yOzJbKL"),
    (url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials");
  auth =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  request(
    {
      url: url,
      headers: {
        Authorization: auth,
      },
    },

    function (error, response, body) {
      // TODO: Use the body object to extract OAuth access token
      responceToken = JSON.parse(body).access_token;
      //mpesa credentials

      const mpesaOnlinePasskey =
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
      var Timestampe = moment().format("YYYYMMDDHHmmss");

      const dataToEncode = "174379" + mpesaOnlinePasskey + Timestampe;
      let buff = Buffer.from(dataToEncode);
      let base64data = buff.toString("base64");

      //simulate transaction

      (oauth_token = responceToken),
        (url =
          "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest");
      auth = "Bearer " + oauth_token;

      request(
        {
          method: "POST",
          url: url,
          headers: {
            Authorization: auth,
          },
          json: {
            BusinessShortCode: "174379",
            Password: base64data,
            Timestamp: Timestampe,
            TransactionType: "CustomerPayBillOnline",
            Amount: "1",
            PartyA: "254719702818",
            PartyB: "174379",
            PhoneNumber: "254719702818",
            CallBackURL:
              "https://c14d-102-166-108-19.ngrok.io/api/payments/mpesa/mycallback/secured",
            // CallBackURL:"https://otiko.com/callback",
            AccountReference: "ChamaChetu2022",
            TransactionDesc: "Chama Chetu",
          },
        },
        function (error, response, body) {
          console.log(body);
        }
      );

      return res.status(200).json({
        message:
          " payment request was successful from our side, wait for the pin prompt.",
      });
    }
  );
});

module.exports = router;
