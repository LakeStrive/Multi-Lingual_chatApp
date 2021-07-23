socket.emit("user-connected", name);

socket.on("user-joined", function (name) {
  let chatJoin = document.createElement("div");
  chatJoin.classList.add("chat");
  chatJoin.classList.add("join");
  chatJoin.innerHTML = name + " joined chat";
  chatWindow.append(chatJoin);
});

socket.on("user-leave", function (name) {
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
  chatLeft.innerHTML = name+" : " +chat;
  chatWindow.append(chatLeft);
  //removing typing..
  let typingEle = document.querySelector(".typing-status");
  typingEle.innerHTML = "";
  chatWindow.append(typingEle);
});


socket.on("chat-typing", function (name) {
  let typingEle = document.querySelector(".typing-status");
  typingEle.innerHTML = name+"  is typing...";
  chatWindow.append(typingEle);
  setTimeout(function() {
   typingEle.innerHTML = "";
  chatWindow.append(typingEle);
  }, 5000);
  
});
