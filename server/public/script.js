let name = prompt("Enter Your Name !");
let chatInputBox = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");
let profilePic=document.querySelector(".profile-pic");
let send=document.querySelector("#send");
//let selectLanguage=document.querySelectorAll(".select-language");
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

// selectLanguage.addEventListener("change", myScript);
function myFunction() {
  var x = document.getElementById("mySelect").value;
 // document.getElementById("demo").innerHTML = "You selected: " + x;
 //alert(x);
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




