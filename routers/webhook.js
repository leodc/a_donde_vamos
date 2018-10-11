var express = require('express');
var router = express.Router();

var bot = require("../bot")

// Adds support for GET requests to our webhook
router.get('/', function(req, res){
  // Parse the query params
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === process.env.WEBHOOK_TOKEN) {
      // Responds with the challenge token from the request
      console.log("Webhook verified correctly");
      res.status(200).send(challenge);
    } else {
      console.error("Tokens do not match");
      res.sendStatus(403);
    }
  }
});


// Creates the endpoint for our webhook
router.post("/", function(req, res){
  var data = req.body;

  // Checks this is an event from a page subscription
  if (data.object == 'page') {

    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        console.log("message: " + JSON.stringify(messagingEvent));
        var senderID = messagingEvent.sender.id;

        if (messagingEvent.message) {
          bot.sayHi(senderID);
        } else if (messagingEvent.postback) {
          bot.handlePostback(messagingEvent);
        } else {
          console.low("unknown event " + messagingEvent);
        }



      });
    });


    res.sendStatus(200);
  }
});

module.exports = router;
