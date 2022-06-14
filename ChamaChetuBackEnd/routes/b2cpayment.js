const router = require('express').Router
const request = require('request')
const moment = require('moment')

router.post('/businesspayment', (req, res) => {
  var token
  ;(consumer_key = '')((consumer_secret = ' '))(
    (url =
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'),
  )
  auth =
    'Basic ' +
    Buffer.from(consumer_key + ':' + consumer_secret).toString('base64')

  request({
    url: url,
    headers: {
      Authorization: auth,
    },
  }),
    function (error, body, response) {
      const responseToken = JSON.parse(body).access_token
      const mpesapassKey = ''
      const ngrok_url = ''((oauth_token = responseToken))
      auth = 'Bearer ' + oauth_token

      request(
          {
              url:"",
              method:POST

          }
      )

    }
})


module.exports 