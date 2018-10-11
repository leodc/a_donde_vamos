var request = require("request");

function send(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.BOT_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if(error || response.statusCode !== 200){
      console.error({"Unable to send message": error, "status": response.statusCode, "body": body});
    }
  });
}


module.exports = {
  send: send
};
