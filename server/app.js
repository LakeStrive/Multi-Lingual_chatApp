const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public")); 

let users = [];

io.on("connection", function (socket) {
  console.log(socket.id, "Socket connected");

  socket.on("user-connected", function (name) {
    users.push({ id: socket.id, name: name });
    console.log(users);

    socket.broadcast.emit("user-joined",name);
  });

  socket.on("chat-append" , function(chat,lang){
    let name;
    for(let i=0 ; i<users.length ; i++){
      if(users[i].id == socket.id){
        name = users[i].name;
        break;
      }
    }
    translateText(chat,lang).then(function(val){
     // console.log(chat+"->"+val);
       val.forEach((vals, i) => {
         chat=val;
      });
      
      socket.broadcast.emit("append-chat" , {name , chat });
    });

  })
  socket.on("chat-typing", function () {
    let name;
    for(let i=0 ; i<users.length ; i++){
      if(users[i].id == socket.id){
        name = users[i].name;
        break;
      }
    }

    socket.broadcast.emit("chat-typing", name);
  });

  socket.on("disconnect", function () {
    let disconnectedUser;
    let filteredUsers = users.filter((userObj) => {
      if (userObj.id == socket.id) {
        disconnectedUser = userObj;
        return false;
      }
      return true;
    });
    users = filteredUsers;
    socket.broadcast.emit("user-leave", disconnectedUser.name);
  });
});

server.listen(4000, function () {
  console.log("App started at port 4000 !!");
});


/**********************************translate****************************/

const {Translate} = require('@google-cloud/translate').v2;


const translate = new Translate();


async function translateText(text,target) {
 
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  let eklocalPromise=translations;
  return  translations;
}

