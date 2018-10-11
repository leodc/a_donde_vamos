var facebookAPI = require("./libs/facebookApi");

function handlePostback(event){
  //
}


function sayHi(senderID){
  var helloMessage = "¡ Hola ! yo te puedo ayudar a encontrar lugares de interes cercanos a ti, perfectos para llegar en bicicleta o caminando :).\n\nPara iniciar solo comparte tu ubicación conmigo o usa alguno de los botones debajo:";

  var message = {
    "recipient":{
      "id": senderID
    },
    "message":{
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
  };

  console.log("Saying hi to " + senderID);
  facebookAPI.send(message);
}


module.exports = {
  sayHi: sayHi,
  handlePostback: handlePostback
};
