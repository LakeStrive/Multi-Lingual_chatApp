let name = prompt("Enter Your Name !");
let chatInputBox = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");
let send=document.querySelector("#send");
let language='en';

chatInputBox.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && chatInputBox.value) {
    let chatRight = document.createElement("div");
    chatRight.classList.add("chat");
    chatRight.classList.add("right");
    chatRight.innerHTML = chatInputBox.value;
    chatWindow.append(chatRight);
    socket.emit("chat-append", chatInputBox.value,language);
    chatInputBox.value = "";
  }
});

chatInputBox.addEventListener("keypress", function (e) {
  socket.emit("chat-typing");
});

function myFunction() {
  var x = document.getElementById("mySelect").value;
 language=x;
}

send.addEventListener('click',function(e){
  if(chatInputBox.value){
  let chatRight = document.createElement("div");
  chatRight.classList.add("chat");
  chatRight.classList.add("right");
  chatRight.innerHTML = chatInputBox.value;
  chatWindow.append(chatRight);
  socket.emit("chat-append", chatInputBox.value,language);
  chatInputBox.value = "";
  }
});




