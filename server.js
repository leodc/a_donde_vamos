var express = require("express");
var bodyParser = require("body-parser");
var crypto = require("crypto");

// creates express http server
var app = express();
app.set("port", process.env.PORT || 80);
app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Routers
var webhookRouter = require("./routers/webhook");
app.use("/webhook", webhookRouter);

// Sets server port and logs message on success
app.listen( app.get("port"), () => console.log("Bot is running on port " + app.get("port")));


// request validation
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    console.error("Couldn't validate the signature");
  } else {
    // valid signature
    var elements = signature.split("=");
    //var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac("sha1", process.env.A_DONDE_APP_SECRET ).update(buf).digest("hex");
    if (signatureHash != expectedHash) {
      console.error("Bad signature");
    }
  }
}
