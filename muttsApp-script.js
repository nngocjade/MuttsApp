let userId = parseInt("3");

//--------------------   CREATE CHAT BUBBLE   --------------------//

function createChatBubble(msgObj) {
  console.log(msgObj);
  let ChatBubble = document.createElement("div");

  if (msgObj.sender_id === userId) {
    ChatBubble.classList.add("chat-bubble", "out");
  } else {
    ChatBubble.classList.add("chat-bubble", "in");
  }
  let paragraph = document.createElement("p");
  paragraph.innerText = msgObj.message;

  ChatBubble.appendChild(paragraph);

  let wrapper = document.getElementById("chat-bubble-wrapper");
  wrapper.prepend(ChatBubble); //add messages to the beginning
}

//--------------------   CREATE CHAT BUBBLE(S)   --------------------//

function createChatBubbles(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach(chatObj => createChatBubble(chatObj));
}

//--------------------   GET USER CHATS    --------------------//

function getUserChats() {
  document.getElementById("message-preview-wrapper").innerHTML = ""; //clears previous message before fetching for new one(s)

  fetch("http://demo.codingnomads.co:8080/muttsapp/users/" + userId + "/chats/")
    .then(Response => Response.json())
    .then(dataObj => createPreviewBoxes(dataObj));

  // .then(function(dataObj){
  //   createPreviewBoxes(dataObj);
  // })
}

getUserChats();

//--------------------   CREATE MESSAGE PREVIEW BOX   --------------------//

function createMessagePreviewBox(chatObj) {
  console.log(chatObj);
  let MessagePreviewBox = document.createElement("div");
  MessagePreviewBox.classList.add("message-preview-box");
  MessagePreviewBox.setAttribute("data-chat_id", chatObj.chat_id);
  MessagePreviewBox.setAttribute("data-sender_id", chatObj.sender_id);
  MessagePreviewBox.addEventListener("click", previewBoxClick);

  let imgWrap = document.createElement("div");
  imgWrap.setAttribute("data-chat_id", chatObj.chat_id);
  imgWrap.setAttribute("data-sender_id", chatObj.sender_id);
  imgWrap.classList.add("img-wrap");
  let image = document.createElement("img");
  image.setAttribute("data-chat_id", chatObj.chat_id);
  image.setAttribute("data-sender_id", chatObj.sender_id);
  image.setAttribute("src", chatObj.photo_url);
  // image.style.backgroundImage = `url(${chatObj.photo_url})`
  image.setAttribute("alt", "default icon");

  imgWrap.appendChild(image);

  let textWrap = document.createElement("div");
  textWrap.setAttribute("data-chat_id", chatObj.chat_id);
  textWrap.setAttribute("data-sender_id", chatObj.sender_id);
  textWrap.classList.add("message-text-wrap");
  let nameParagraph = document.createElement("p");
  nameParagraph.setAttribute("data-chat_id", chatObj.chat_id);
  nameParagraph.setAttribute("data-sender_id", chatObj.sender_id);
  nameParagraph.innerText = chatObj.chat_name;
  let messageParagraph = document.createElement("p");
  messageParagraph.setAttribute("data-chat_id", chatObj.chat_id);
  messageParagraph.setAttribute("data-sender_id", chatObj.sender_id);
  messageParagraph.innerText = chatObj.last_message;

  textWrap.appendChild(nameParagraph);
  textWrap.appendChild(messageParagraph);

  let dateWrap = document.createElement("div");
  dateWrap.setAttribute("data-chat_id", chatObj.chat_id);
  dateWrap.setAttribute("data-sender_id", chatObj.sender_id);
  dateWrap.classList.add("date-wrap");
  let dateP = document.createElement("p");
  dateP.setAttribute("data-chat_id", chatObj.chat_id);
  dateP.setAttribute("data-sender_id", chatObj.sender_id);
  dateP.innerHTML = new Date(chatObj.date_sent).toLocaleDateString(); //always instantiate a new date

  dateWrap.appendChild(dateP);

  MessagePreviewBox.appendChild(imgWrap);
  MessagePreviewBox.appendChild(textWrap);
  MessagePreviewBox.appendChild(dateWrap);

  let MessagePreviewWrapper = document.getElementById(
    "message-preview-wrapper"
  );
  MessagePreviewWrapper.appendChild(MessagePreviewBox);
}

//--------------------   CREATE PREVIEW BOXE(S)  --------------------//

function createPreviewBoxes(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach(chatObj => createMessagePreviewBox(chatObj));
}

//--------------------   PREVIEW BOX CLICK  --------------------//

function previewBoxClick(event) {
  document.getElementById("chat-bubble-wrapper").innerHTML = " ";
  console.log(event.target);
  let chatID = event.target.dataset.chat_id;
  let senderID = event.target.dataset.sender_id;

  document.getElementById("send-message").dataset.chat_id = chatID; //getting message form data attribute and setting to chatID

  fetch(
    "http://demo.codingnomads.co:8080/muttsapp/users/" +
      userId +
      "/chats/" +
      senderID
  )
    .then(ressponse => ressponse.json())
    .then(dataObj => createChatBubbles(dataObj));
}

//--------------------   ADD EVENT(SUBMIT) LISTENER    --------------------//

let newMessageForm = document.getElementById("send-message");

newMessageForm.addEventListener("submit", function(event) {
  event.preventDefault(); //
  console.log(event);

  let msg = document.getElementById("new-message").value;

  let msgObj = {
    message: msg,
    sender_id: userId,
    chat_id: event.target.dataset.chat_id //parsing into the event object target > dataset > chat_id

    // chat_id: document.getElementById('send-message').dataset.chat_id
  };

  createChatBubble(msgObj);
  sendMessageToAPI(msgObj);

  document.getElementById("new-message").value = " ";
});

//--------------------   SEND MESSAGE TO API   --------------------//

function sendMessageToAPI(msgObj) {
  let postParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(msgObj)
  };
  fetch(
    `http://demo.codingnomads.co:8080/muttsapp/users/${userId}/chat`,
    postParams
  )
    .then(res => res.json())
    .then(res => getUserChats());
}

//--------------------   NEW USER    --------------------//

function newUser() {
  let postData = {
    first_name: "",
    last_name: "",
    username: "",
    photo_url: ""
  };
  let postParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(postData)
  };
  fetch("http://demo.codingnomads.co:8080/muttsapp/users/", postParams)
    .then(res => res.json())
    .then(res => console.log(res));
}

//******* SAVED FOR LATER!! *******
// let chats = [
//   {
//     sender_id: "1",
//     photo_url: "./images/icons8-bullbasaur-50.png",
//     last_message: "hi",
//     chat_name: "Bullbasaur",
//     date_sent: "3/19/20"
//   },
//   {
//     sender_id: "2",
//     photo_url: "./images/icons8-pikachu-pokemon-50.png",
//     last_message: "hello",
//     chat_name: "pikachu",
//     date_sent: "3/19/20"
//   },
//   {
//     sender_id: "3",
//     photo_url: "./images/icons8-charmander-50.png",
//     last_message: "How it's going?",
//     chat_name: "Charmander",
//     date_sent: "3/20/20"
//   },
//   {
//     sender_id: "4",
//     photo_url: "./images/icons8-eevee-50.png",
//     last_message: "Hey girl!",
//     chat_name: "Eevee",
//     date_sent: "3/21/20"
//   },
//   {
//     sender_id: "5",
//     photo_url: "./images/icons8-jigglypuff-50.png",
//     last_message: "Wanna hangout?",
//     chat_name: "Jiggly Puff",
//     date_sent: "3/22/20"
//   },
//   {
//     sender_id: "6",
//     photo_url: "./images/icons8-dratini-50.png",
//     last_message: "See ya later!",
//     chat_name: "Dratini",
//     date_sent: "3/23/20"
//   }
// ];

// chats.forEach(chat => {
//   createMessagePreviewBox(chat);
// });
