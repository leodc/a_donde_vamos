var facebookAPI = require("./libs/facebookApi");


function talk(senderID, message){
  var message = {
    "recipient": {
      "id": senderID
    },
    message: message
  }

  facebookAPI.send(message);
}


function startConnectWithFriend(senderID){

  facebookAPI.getUserData(senderID, function(error, response, data){
    if(error){
      console.log("Error getting user data: " + senderID);
    }

    data = json.parse(data);

    var message = {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"generic",
              "elements": [
                  {
                      "title": "Conectar con " + data["first_name"],
                      "image_url": data.profile_pic,
                      "subtitle": "Si deseas crear tu propio cuadro para conectar enviame un mensaje!",
                      "buttons":[
                          {
                              "type": "postback",
                              "title": "Conectar con " + data["first_name"],
                              "payload": "payload_connect_with_" + senderID
                          },
                          {
                              "type":"element_share"
                          }
                      ]
                  }
              ]
          }
      }
    }

    talk(senderID, message);
  });


}


function sayHi(senderID){
  var helloMessage = "¡ Hola ! yo te puedo ayudar a encontrar lugares de interes cercanos a ti, perfectos para llegar en bicicleta o caminando :).\n\nPara iniciar solo comparte tu ubicación conmigo o usa alguno de los botones debajo:";

  var message = {
    "text": helloMessage,
    "quick_replies":[
      // {
      //   "content_type":"location"
      // },
      {
        "content_type": "text",
        "title": "Conectar con un amigo",
        "payload": "START_CONNECT_WITH_FRIEND"
      }
    ]
  }

  talk(senderID, message);
}


module.exports = {
  sayHi: sayHi,
  startConnectWithFriend: startConnectWithFriend
};
