var express = require("express");
var bodyParser = require("body-parser");

// creates express http server
var app = express();
app.set("port", process.env.PORT || 80);
app.use(bodyParser.json());

// Routers
var webhookRouter = require("./routers/webhook");
app.use("/webhook", webhookRouter);

// Sets server port and logs message on success
app.listen( app.get("port"), () => console.log("Bot is running on port " + app.get("port")));
