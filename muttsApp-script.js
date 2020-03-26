const createChatBubble = () => {
 let ChatBubble = document.createElement('div');
 ChatBubble.classList.add("chat-bubble", 'out');

 let paragraph = document.createElement('p');
 paragraph.innerText = "This is a Javascript created Paragraph";

 ChatBubble.appendChild(paragraph);

 let wrapper = document.getElementById('chat-bubble-wrapper');
 wrapper.appendChild(ChatBubble)
}

for(let idx = 0; idx < 10; idx++){
 
 if(idx % 2 === 0){
  createChatBubble('out')
 } else {
  createChatBubble('in')
 }
}