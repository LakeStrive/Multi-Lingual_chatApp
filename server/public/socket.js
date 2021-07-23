socket.emit("user-connected", name);

socket.on("user-joined", function (name) {
  // create a join div
  let chatJoin = document.createElement("div");
  chatJoin.classList.add("chat");
  chatJoin.classList.add("join");
  chatJoin.innerHTML = name + " joined chat";
  chatWindow.append(chatJoin);
});

socket.on("user-leave", function (name) {
  // create a join div
  let chatLeave = document.createElement("div");
  chatLeave.classList.add("chat");
  chatLeave.classList.add("leave");
  chatLeave.innerHTML = name + " left chat";
  chatWindow.append(chatLeave);
});

socket.on("append-chat", function ({name ,chat}) {
  let chatLeft = document.createElement("div");
  chatLeft.classList.add("chat");
  chatLeft.classList.add("left");
  // console.log("broadcasrting"+chat);
  // console.log(typeof chat);
  chatLeft.innerHTML = name+" : " +chat;
  chatWindow.append(chatLeft);
  //removing typing..
  let typingEle = document.querySelector(".typing-status");
  typingEle.innerHTML = "";
  chatWindow.append(typingEle);
});


socket.on("chat-typing", function (name) {
  let typingEle = document.querySelector(".typing-status");
  //console.log(typingEle);
  typingEle.innerHTML = name+"  is typing...";
  chatWindow.append(typingEle);
  setTimeout(function() {
    //your code to be executed after 5
   typingEle.innerHTML = "";
  chatWindow.append(typingEle);
  }, 5000);
  
});
