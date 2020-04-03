let userId = parseInt("3");

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

//Attach a "submit" listener to the message form
let newMessageForm = document.getElementById("send-message");
newMessageForm.addEventListener("submit", function(event) {
  //pass a callback function, submission of form occurs then the function is called
  event.preventDefault(); //overrides html form submission, IMPORTANT!
  let msg = document.getElementById("new-message").value; //storing the inputted value by user into "msg"
  createChatBubble(msg);
  //passing "msg" into "createChatBubble" function
  document.getElementById("new-message").value = " "; //deleting (clearing) value in the input, because it is now on the screen/in chat
});

//As soon as JS file loads, we run this function to get all the items for the sidebar
function getUserChats() {
  fetch("http://demo.codingnomads.co:8080/muttsapp/users/" + userId + "/chats/")
    .then(Response => Response.json())
    .then(dataObj => createPreviewBoxes(dataObj));
}
getUserChats();

function createPreviewBoxes(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach(chatObj => createMessagePreviewBox(chatObj));
}

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
  nameParagraph.setAttribute("chat-chat_id", chatObj.chat_id);
  nameParagraph.setAttribute("chat-sender_id", chatObj.sender_id);
  nameParagraph.innerText = chatObj.chat_name;
  let messageParagraph = document.createElement("p");
  messageParagraph.setAttribute("chat-chat_id", chatObj.chat_id);
  messageParagraph.setAttribute("chat-sender_id", chatObj.sender_id);
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

function previewBoxClick(event) {
  document.getElementById("chat-bubble-wrapper").innerHTML = " ";
  // This gets the value of the "data-chat_id" attribute on the clicked element
  let chatID = event.target.dataset.chat_id;
  let senderID = event.target.dataset.sender_id;
  //The value of "chatID" is passed to this url, to create a dynamically generated API based on which preview box is clicked
  fetch(
    "http://demo.codingnomads.co:8080/muttsapp/users/" +
      userId +
      "/chats/" +
      senderID
  )
    //The info retrieved in the fetch request returns a response object.
    //The response object is assigned to the parameter in the following method as "response"
    .then(ressponse => ressponse.json())
    //The response object needs to be turned into a JS object for parsing. That process is above, then the result is passed to the next '.then' method

    // The object created in the last step is assigned to "dataObj", then the data object is passed to a function that handles the creation of a chat message bubble
    .then(dataObj => createChatBubbles(dataObj));
}

function createChatBubbles(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach(chatObj => createChatBubble(chatObj));
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
