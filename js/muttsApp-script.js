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
let newChatModalButton = document.getElementById("modal-button");
//--open icon profile modal button
let iconProfileModalButton = document.getElementById(
  "icon-profile-modal-button"
);
//---open new group modal button
let newGroupModalButton = document.getElementById("newgroup-modal-button");
// ---open profile modal button
let profileModalButton = document.getElementById("profile-modal-button");
// ---open setting modal button
let settingModalButton = document.getElementById("setting-modal-button");

//---get close button
let closeButton = document.getElementsByClassName("close-button")[0];

//---listen for OPEN click
newChatModalButton.addEventListener("click", openNewChatModal);
newGroupModalButton.addEventListener("click", openNewGroupModal);
profileModalButton.addEventListener("click", openProfileModal);
settingModalButton.addEventListener("click", openSettingsModal);
iconProfileModalButton.addEventListener("click", openIconProfileModal);

// --------------CREATE FLOATING SEND BUTTON----------//
function createFloatingSendButton() {
  let floatButton = document.createElement("div");
  floatButton.classList.add("float-button");
  floatButton.setAttribute("id", "float-button-id");
  floatButton.innerHTML = '<i class="float-angle-icon fa fa-arrow-right"></i>';

  let modalContent = document.getElementById("modal-content-id");
  modalContent.append(floatButton);
}

//--------------OPEN NEW CHAT MODAL----------//
function openNewChatModal() {
  let modalContent = document.getElementById("modal-content-id");
  modalContent.innerHTML = "";
  //need to grab elementbyid in order to set innerHTML
  let hTwoInnerText = document.getElementById("hTwo-Inner-Text");
  hTwoInnerText.innerHTML = "Select Contact";

  let modalHeaderIcon = document.getElementById("modal-header-icon");
  modalHeaderIcon.innerHTML = "";

  let button = document.createElement("button");
  button.innerHTML = '<i class="close-button 	fa fa-user-plus"></i>';

  modalHeaderIcon.appendChild(button);

  createSearchBox();
  createContactPreviewBox();
  createFloatingSendButton();
  openModal();
}

//-------------OPEN NEW GROUP MODAL ---------------

function openNewGroupModal() {
  let modalContent = document.getElementById("modal-content-id");
  modalContent.innerHTML = "";
  //need to grab elementbyid in order to set innerHTML
  let hTwoInnerText = document.getElementById("hTwo-Inner-Text");
  hTwoInnerText.innerHTML = "Add group participant";

  let modalHeaderIcon = document.getElementById("modal-header-icon");
  modalHeaderIcon.innerHTML = "";

  let button = document.createElement("button");
  button.innerHTML = '<i class="close-button 	fa fa-user-plus"></i>';

  modalHeaderIcon.appendChild(button);

  createSearchBox();
  createContactPreviewBox();
  createFloatingSendButton();
  openModal();
}

//-------------OPEN PROFILE MODAL ---------------

function openProfileModal() {
  let modalContent = document.getElementById("modal-content-id");
  modalContent.innerHTML = "";

  let hTwoInnerText = document.getElementById("hTwo-Inner-Text");
  hTwoInnerText.innerHTML = "Profile";

  let modalHeaderIcon = document.getElementById("modal-header-icon");
  modalHeaderIcon.innerHTML = "";

  createEditProfileImage();
  createEditName();
  createEditAbout();
  openModal();
}

//-------------OPEN SETTINGS MODAL ---------------

function openSettingsModal() {
  let modalContent = document.getElementById("modal-content-id");
  modalContent.innerHTML = "";

  let hTwoInnerText = document.getElementById("hTwo-Inner-Text");
  hTwoInnerText.innerHTML = "Settings";

  let modalHeaderIcon = document.getElementById("modal-header-icon");
  modalHeaderIcon.innerHTML = "";

  createSettingsModal();
  openModal();
}

//--------------OPEN ICON PROFILE MODAL -----------------

function openIconProfileModal() {
  let modalContent = document.getElementById("modal-content-id");
  modalContent.innerHTML = "";

  let hTwoInnerText = document.getElementById("hTwo-Inner-Text");
  hTwoInnerText.innerHTML = "Profile";

  let modalHeaderIcon = document.getElementById("modal-header-icon");
  modalHeaderIcon.innerHTML = "";

  createEditProfileImage();
  createEditName();
  createEditAbout();
  openModal();
}

//------------CREATE SEARCH BOX---------------
function createSearchBox() {
  let searchFormWrap = document.createElement("div");
  searchFormWrap.classList.add("search");
  searchFormWrap.classList.add("form-wrap");
  searchFormWrap.setAttribute("id", "search-form-wrap");

  let searchForm = document.createElement("form");
  searchForm.setAttribute("id", "search-contact-form");
  searchForm.innerHTML =
    '<i class="static - search - icon 	fa fa - search"></i>';

  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search");
  searchInput.setAttribute("id", "search-contact-input");
  searchInput.setAttribute("placeholder", "Search...");

  searchForm.append(searchInput);
  searchFormWrap.appendChild(searchForm);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.appendChild(searchFormWrap);
}

//--------------------   CREATE CONTACT PREVIEW BOX   --------------------//

function createContactPreviewBox() {
  let contactPreviewWrapper = document.createElement("div");
  contactPreviewWrapper.classList.add("contact-preview-wrap");
  contactPreviewWrapper.setAttribute("id", "contact-preview-wrapper");

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

  contactPreviewWrapper.appendChild(contactPreviewBox);

  contactPreviewBox.appendChild(imgWrap);
  contactPreviewBox.appendChild(textWrap);

  textWrap.appendChild(nameParagraph);
  textWrap.appendChild(messageParagraph);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.appendChild(contactPreviewWrapper);
}

//-------------CREATE EDIT PROFILE IMAGE------------------

function createEditProfileImage() {
  let imgWrap = document.createElement("div");
  imgWrap.classList.add("img-wrap");
  imgWrap.setAttribute("id", "edit-profile-img-div");
  let image = document.createElement("img");
  image.setAttribute("src", "./images/icons8-pikachu-pokemon-50.png");
  image.setAttribute("alt", "default icon");
  image.setAttribute("id", "edit-profile-img");

  imgWrap.appendChild(image);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.classList.add("edit-profile-modal-content");
  modalContent.appendChild(imgWrap);
}

//---------------CREATE EDIT NAME-----------------

function createEditName() {
  let editNameWrap = document.createElement("div");
  editNameWrap.classList.add("div-wrap");
  editNameWrap.setAttribute("id", "edit-name-wrap-id");

  let yourNameP = document.createElement("p");
  yourNameP.setAttribute("id", "your-name-p-static");
  yourNameP.innerHTML = "Your Poke Name";

  let editNameForm = document.createElement("form");
  editNameForm.classList.add("modal-form-wrap");

  editNameForm.innerHTML = '<i class="fas fa-pen"></i>';

  let editNameInput = document.createElement("input");
  editNameInput.setAttribute("type", "text");
  editNameInput.setAttribute("name", "name");
  editNameInput.setAttribute("id", "name-input-id");
  editNameInput.setAttribute("placeholder", "Poke Name..");

  editNameForm.appendChild(editNameInput);

  editNameWrap.appendChild(yourNameP);
  editNameWrap.appendChild(editNameForm);

  let staticTextWrap = document.createElement("div");
  staticTextWrap.setAttribute("id", "static-name-wrap-id");

  let staticTextP = document.createElement("p");
  staticTextP.setAttribute("id", "static-text-p");
  staticTextP.innerHTML =
    "This is not your username or pin. This name will be visible to your PokeChat contacts.";

  staticTextWrap.appendChild(staticTextP);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.appendChild(editNameWrap);
  modalContent.appendChild(staticTextWrap);
}

//--------CREATE EDIT ABOUT-----------

function createEditAbout() {
  let editAboutWrap = document.createElement("div");
  editAboutWrap.classList.add("div-wrap");
  editAboutWrap.setAttribute("id", "edit-about-wrap-id");

  let aboutP = document.createElement("p");
  aboutP.setAttribute("id", "your-about-p-static");
  aboutP.innerHTML = "About";

  let editAboutForm = document.createElement("form");
  editAboutForm.classList.add("modal-form-wrap");

  editAboutForm.innerHTML = '<i class="fas fa-pen"></i>';

  let editAboutInput = document.createElement("input");
  editAboutInput.setAttribute("type", "text");
  editAboutInput.setAttribute("name", "about");
  editAboutInput.setAttribute("id", "about-input-id");
  editAboutInput.setAttribute("placeholder", "about me...");

  editAboutForm.appendChild(editAboutInput);

  editAboutWrap.appendChild(aboutP);
  editAboutWrap.appendChild(editAboutForm);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.appendChild(editAboutWrap);
}

// ------------CREATE SETTINGS MODAL--------------------

function createSettingsModal() {
  let profileImgNameDiv = document.createElement("div");
  profileImgNameDiv.setAttribute("id", "profile-img-name-div-id");
  profileImgNameDiv.classList.add("img-wrap");

  let miniProfileImg = document.createElement("img");
  miniProfileImg.setAttribute("src", "./images/icons8-pikachu-pokemon-50.png");
  miniProfileImg.setAttribute("alt", "mini profile image");
  miniProfileImg.setAttribute("id", "setting-mini-profile-img");

  profileImgNameDiv.appendChild(miniProfileImg);

  let profileName = document.createElement("p");
  profileName.setAttribute("id", "profile-name-id");
  profileName.innerHTML = "pikachu";

  profileImgNameDiv.appendChild(profileName);

  let notificationDiv = document.createElement("div");
  notificationDiv.classList.add("settings-div");
  notificationDiv.innerHTML = '<i class="fa fa-bell setting-icon"></i>';

  let notificationP = document.createElement("p");
  notificationP.classList.add("setting-modal-p");
  notificationP.innerHTML = "Notification";

  notificationDiv.appendChild(notificationP);

  let ChatWallpaperDiv = document.createElement("div");
  ChatWallpaperDiv.classList.add("settings-div");
  ChatWallpaperDiv.innerHTML =
    '<i class="material-icons setting-icon">crop_original</i>';

  let ChatWallpaperP = document.createElement("p");
  ChatWallpaperP.classList.add("setting-modal-p");
  ChatWallpaperP.innerHTML = "Chat Wallpaper";

  ChatWallpaperDiv.appendChild(ChatWallpaperP);

  let BlockedDiv = document.createElement("div");
  BlockedDiv.classList.add("settings-div");
  BlockedDiv.innerHTML = '<i class="fa fa-ban setting-icon"></i>';

  let BlockedP = document.createElement("p");
  BlockedP.classList.add("setting-modal-p");
  BlockedP.innerHTML = "Blocked";

  BlockedDiv.appendChild(BlockedP);

  let HelpDiv = document.createElement("div");
  HelpDiv.classList.add("settings-div");
  HelpDiv.innerHTML = '<i class="fa fa-question-circle setting-icon"></i>';

  let HelpP = document.createElement("p");
  HelpP.classList.add("setting-modal-p");
  HelpP.innerHTML = "Help";

  HelpDiv.appendChild(HelpP);

  let modalContent = document.getElementById("modal-content-id");
  modalContent.classList.add("setting-modal-content");
  modalContent.appendChild(profileImgNameDiv);
  modalContent.appendChild(notificationDiv);
  modalContent.appendChild(ChatWallpaperDiv);
  modalContent.appendChild(BlockedDiv);
  modalContent.appendChild(HelpDiv);
}

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

// ------------------ON CLICK DROP DOWN MENU (SIDE BAR)------------------

let dropDownButton = document.getElementById("dropdown-button");

let dropdownContent = document.getElementById("dropdown-content-id");

// ------click to open menu
dropDownButton.addEventListener("click", openDropdown);

//--------function to open menu
function openDropdown(event) {
  let el = document.getElementById("dropdown-content-id");
  console.log(el.classList);
  document.getElementById("dropdown-content-id").classList.toggle("show");
  console.log(el.classList);
}

//---Listen for OUTSIDE click
//---this works for both sidebar and header main dropdown menu
window.addEventListener("click", outsideClickButton);

function outsideClickButton(e) {
  console.log(e.target.closest(".dropdown-button"));
  if (!e.target.closest(".dropdown-button")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdownOne = dropdowns[i];
      if (openDropdownOne.classList.contains("show")) {
        openDropdownOne.classList.remove("show");
      }
    }
  }
}

// ------------------ON CLICK DROP DOWN MENU (HEADER MAIN)------------------

let dropDownButton2 = document.getElementById("dropdown-button-main");

// ------click to open menu
dropDownButton2.addEventListener("click", openDropdown2);

//--------function to open menu
function openDropdown2(event) {
  document.getElementById("dropdown-content-main").classList.toggle("show");
}

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

function makeNewChatForm(e) {
  newChatModalBody.innerHTML = "Loading Chat Form";
  fetch(`${baseUrl}/users/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let usersArray = data.data;
      let frm = document.createElement("form");
      frm.id = `new-chat-frm`;
      let formString = ``;
      formString += `<input id="new-chat-user" type="text" list="users-list" class="form-control">`;
      formString += `<datalist id="users-list">`;
      usersArray.forEach((userObj) => {
        formString += `<option data-value="${userObj.id}" value="${userObj.first_name} ${userObj.last_name}"></option> `;
      });
      formString += `</datalist>`;
      formString += `<input type="submit" class="btn btn-success">`;
      frm.innerHTML = formString;
      frm.addEventListener("submit", newChatSubmit);
      newChatModalBody.innerHTML = "";
      newChatModalBody.appendChild(frm);
    });
}
function newChatSubmit(e) {
  e.preventDefault();
  let options = document.getElementById("users-list").options;
  console.log(document.getElementById("users-list").options);
  console.log(e.target.elements);
  let val = e.target.elements["new-chat-user"].value;
  console.log(val);
  let newChatUserId;
  Array.from(options).forEach((option) => {
    if (option.value === val) {
      newChatUserId = option.getAttribute("data-value");
    }
  });
  console.log(newChatUserId);
  // Write submit fetch here
}

// ------------------ EMOJI PLUGGIN ---------------------------

window.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#emoji-btn");
  const picker = new EmojiButton();
  picker.on("emoji", (emoji) => {
    document.querySelector("#new-message").value += emoji;
  });

  button.addEventListener("click", () => {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  });
});

//----------------------CLICK LISTENER DROPDOWN ICON ATTACHMENTS-------------

let paperClipDropdownButton = document.getElementById("paper-clip-icon-id");

// ------click to open menu
paperClipDropdownButton.addEventListener("click", openPaperDropdownAttachments);

//--------function to open menu
function openPaperDropdownAttachments() {
  let attachmentButtonWrap = document.getElementById("paper-clip-icon-id");
  attachmentButtonWrap.innerHTML = "";
  createAttachmentDropdown();
}

// --------------------- DROPDOWN ICON ATTACHMENTS ---------------------

function createAttachmentDropdown() {
  let photosAndVideosWrap = document.createElement("div");
  photosAndVideosWrap.classList.add("icon-wrap");
  photosAndVideosWrap.setAttribute("id", "photo-and-video-wrap-id");
  photosAndVideosWrap.innerHTML =
    '<i class="attachment-dropdown-icons far fa-image"></i>';

  let cameraWrap = document.createElement("div");
  cameraWrap.classList.add("icon-wrap");
  cameraWrap.setAttribute("id", "camera-wrap-id");
  cameraWrap.innerHTML =
    '<i class="attachment-dropdown-icons fa fa-camera"></i>';

  let documentsWrap = document.createElement("div");
  documentsWrap.classList.add("icon-wrap");
  documentsWrap.setAttribute("id", "documents-wrap-id");
  documentsWrap.innerHTML = '<i class="attachment-dropdown-icons fa fa-file-o"';

  let contactWrap = document.createElement("div");
  contactWrap.classList.add("icon-wrap");
  contactWrap.setAttribute("id", "contact-wrap-id");
  contactWrap.innerHTML =
    '<i class="attachment-dropdown-icons fa fa-user"></i>';

  let roomWrap = document.createElement("div");
  roomWrap.classList.add("icon-wrap");
  roomWrap.setAttribute("id", "room-wrap-id");
  roomWrap.innerHTML =
    '<i class="attachment-dropdown-icons fa fa-video-camera"></i>';

  let attachmentButtonWrap = document.getElementById("paper-clip-icon-id");
  attachmentButtonWrap.appendChild(photosAndVideosWrap);
  attachmentButtonWrap.appendChild(cameraWrap);
  attachmentButtonWrap.appendChild(documentsWrap);
  attachmentButtonWrap.appendChild(contactWrap);
  attachmentButtonWrap.appendChild(roomWrap);
}
