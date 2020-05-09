let userId = parseInt("3");
let baseUrl = "http://demo.codingnomads.co:8082/muttsapp";

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
  chatsArr.forEach((chatObj) => createChatBubble(chatObj));
}

//--------------------   GET USER CHATS    --------------------//

function getUserChats() {
  document.getElementById("message-preview-wrapper").innerHTML = ""; //clears previous message before fetching for new one(s)

  fetch(`${baseUrl}/users/${userId}/chats/`)
    .then((Response) => Response.json())
    .then((dataObj) => createPreviewBoxes(dataObj));

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

//--------------------   CREATE CONTACT PREVIEW BOX   --------------------//

function createContactPreviewBox() {
  let contactPreviewBox = document.createElement("div");
  contactPreviewBox.classList.add("contact-preview-box");

  let imgWrap = document.createElement("div");
  imgWrap.classList.add("img-wrap");
  let image = document.createElement("img");
  image.setAttribute("src", "./images/icons8-pikachu-pokemon-50.png");
  image.setAttribute("alt", "default icon");

  imgWrap.appendChild(image);

  let textWrap = document.createElement("div");
  textWrap.classList.add("contact-text-wrap");
  let nameParagraph = document.createElement("p");
  nameParagraph.innerText = "contact - user's - name";
  let messageParagraph = document.createElement("p");
  messageParagraph.innerText = "contact - last message";

  textWrap.appendChild(nameParagraph);
  textWrap.appendChild(messageParagraph);

  contactPreviewBox.appendChild(imgWrap);
  contactPreviewBox.appendChild(textWrap);

  let contactPreviewWrapper = document.getElementById(
    "contact-preview-wrapper"
  );
  contactPreviewWrapper.appendChild(contactPreviewBox);
}

createContactPreviewBox();

//--------------------   CREATE PREVIEW BOXE(S)  --------------------//

function createPreviewBoxes(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach((chatObj) => createMessagePreviewBox(chatObj));
}

//--------------------   PREVIEW BOX CLICK  --------------------//

function previewBoxClick(event) {
  document.getElementById("chat-bubble-wrapper").innerHTML = " ";
  console.log(event.target);
  let chatID = event.target.dataset.chat_id;
  let senderID = event.target.dataset.sender_id;

  document.getElementById("send-message").dataset.chat_id = chatID; //getting message form data attribute and setting to chatID

  fetch(`${baseUrl}/users/${userId}/chats/${senderID}`)
    .then((ressponse) => ressponse.json())
    .then((dataObj) => createChatBubbles(dataObj));
}

//---------------------GET MODAL ELEMENT------------------------

//---get modal element
let modal = document.getElementById("popup-modal-window");

//---get open modal button
let modalButton = document.getElementById("modal-button");

//---get close button
let closeButton = document.getElementsByClassName("close-button")[0];

//---listen for OPEN click
modalButton.addEventListener("click", openModal);

//---listen for CLOSE click
closeButton.addEventListener("click", closeModal);

//---Listen for OUTSIDE click
window.addEventListener("click", outsideClick);

//---Function to open modal
function openModal() {
  modal.style.display = "block";
  document.getElementById("header-main").style.opacity = 0.2;
  document.querySelector(".main-content").style.opacity = 0.2;
}

//---Function to close modal
function closeModal() {
  modal.style.display = "none";
  document.getElementById("header-main").style.opacity = 1;
  document.querySelector(".main-content").style.opacity = 1;
}

//Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("header-main").style.opacity = 1;
    document.querySelector(".main-content").style.opacity = 1;
  }
}

// ------------------ON CLICK DROP DOWN MENU------------------

let dropDownButton = document.getElementById("dropdown-button");

// ------click to open menu
dropDownButton.addEventListener("click", openDropdown);

//--------function to open menu
function openDropdown (event) {
  document.getElementById("dropdown-content").classList.toggle("show");
}

// window.addEventListener("click", function (event) {
//   if (!event.target.matches(".dropdown-button")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// });

//--------------------   ADD EVENT(SUBMIT) LISTENER    --------------------//

let newMessageForm = document.getElementById("send-message");

newMessageForm.addEventListener("submit", function (event) {
  event.preventDefault(); //
  console.log(event);

  let msg = document.getElementById("new-message").value;

  let msgObj = {
    message: msg,
    sender_id: userId,
    chat_id: event.target.dataset.chat_id, //parsing into the event object target > dataset > chat_id

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
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(msgObj),
  };
  fetch(`${baseUrl}/users/${userId}/chat`, postParams)
    .then((res) => res.json())
    .then((res) => getUserChats());
}

//--------------------   NEW USER    --------------------//

function newUser() {
  let postData = {
    first_name: "",
    last_name: "",
    username: "",
    photo_url: "",
  };
  let postParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(postData),
  };
  fetch(`${baseUrl}/users/`, postParams)
    .then((res) => res.json())
    .then((res) => console.log(res));
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
