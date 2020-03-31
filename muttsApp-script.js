const createChatBubble = (msg) => {
  let ChatBubble = document.createElement("div");
  ChatBubble.classList.add("chat-bubble", outIn);

  let paragraph = document.createElement("p");
  paragraph.innerText = msg;

  ChatBubble.appendChild(paragraph);

  let wrapper = document.getElementById("chat-bubble-wrapper");
  wrapper.appendChild(ChatBubble);
};

let newMessageForm = document.getElementById('send-message')

newMessageForm.addEventListener('submit', function(event){
  event.preventDefault
  let msg = document.getElementById('new-message').value;
  createChatBubble(msg);
  document.getElementById('new-message').value = "";
});

function createMessagePreviewBox (chatObj) {
  let MessagePreviewBox = document.createElement("div");
  MessagePreviewBox.classList.add("message-preview-box");

  let imgWrap = document.createElement("div");
  imgWrap.classList.add("img-wrap");
  let img = new Image();
  img.src = chatObj.img;
  img.alt = chatObj.alt;

  imgWrap.appendChild(img);

  let messageTextWrap = document.createElement("div");
  messageTextWrap.classList.add("message-text-wrap");
  let SenderNameParagraph = document.createElement("p");
  SenderNameParagraph.innerText = chatObj.name;
  let SenderMessageParagraph = document.createElement("p");
  SenderMessageParagraph.innerText = chatObj.msg;

  messageTextWrap.appendChild(SenderNameParagraph);
  messageTextWrap.appendChild(SenderMessageParagraph);

  let dateWrap = document.createElement("div");
  dateWrap.classList.add("date-wrap");
  let dateParagraph = document.createElement("p");
  dateParagraph.innerHTML = new Date(chatObj.date).toLocaleDateString(); //always instantiate a new date

  dateWrap.appendChild(dateParagraph);

  MessagePreviewBox.appendChild(imgWrap);
  MessagePreviewBox.appendChild(messageTextWrap);
  MessagePreviewBox.appendChild(dateWrap);

  let MessagePreviewWrapper = document.getElementById(
    "message-preview-wrapper"
  );
  MessagePreviewWrapper.appendChild(MessagePreviewBox);
};


let chats = [
  {
    img: "./images/icons8-bullbasaur-50.png",
    alt: "bullbasaur",
    msg: "hi",
    name: "Bullbasaur",
    date: "3/12/20"
  },
  {
    img: "./images/icons8-pikachu-pokemon-50.png",
    alt: "pikachu",
    msg: "hello",
    name: "pikachu",
    date: "3/19/20"
  },
  {
    img: "./images/icons8-charmander-50.png",
    alt: "charmander",
    msg: "How it's going?",
    name: "Charmander",
    date: "3/20/20"
  },
  {
    img: "./images/icons8-eevee-50.png",
    alt: "eevee",
    msg: "Hey girl!",
    name: "Eevee",
    date: "3/21/20"
  },
  {
    img: "./images/icons8-jigglypuff-50.png",
    alt: "jigglypuff",
    msg: "Wanna hangout?",
    name: "Jiggly Puff",
    date: "3/22/20"
  },
  {
    img: "./images/icons8-dratini-50.png",
    alt: "dratini",
    msg: "See ya later!",
    name: "Dratini",
    date: "3/23/20"
  }
];

chats.forEach(chat => {
  createMessagePreviewBox(chat);
});

