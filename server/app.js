const express = require("express");

// express => it is used to create server easily

// server is created
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public")); // it makes public folder static

let users = [];

io.on("connection", function (socket) {
  console.log(socket.id, "Socket connected");

  socket.on("user-connected", function (name) {
    users.push({ id: socket.id, name: name });
    console.log(users);

    // emit on all the socket except the sender
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
      console.log(chat+"->"+val);
      // console.log(typeof val);
      // console.log(typeof chat);
       console.log( typeof JSON.stringify(val));
       val.forEach((vals, i) => {
         chat=val;
      });
       //chat=JSON.stringify(val)[0];
      //let transl="pros"
      
      socket.broadcast.emit("append-chat" , {name , chat });
    });
   // socket.broadcast.emit("append-chat" , {name , chat});
  })
  socket.on("chat-typing", function () {
    let name;
    for(let i=0 ; i<users.length ; i++){
      if(users[i].id == socket.id){
        name = users[i].name;
        break;
      }
    }
   // console.log(name);
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


/***************************************translate****************************/
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'Hello, world!';
// const target = 'ru';

async function translateText(text,target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  let eklocalPromise=translations;
  
  console.log('Translations:');
  //console.log(translations);
  translations.forEach((translation, i) => {
    //console.log(`${text[i]} => (${target}) ${translation}`);
    //socket.broadcast.emit("append-chat" , {name , chat});
    // return  translation;
  });
  return  translations;
}

//  translateText('Hello, world! how are you i am from india ','hi').then(function(val){
//    console.log("yo+"+val);
//  });
