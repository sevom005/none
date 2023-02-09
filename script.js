const chatContainer = document.querySelector(".chat-container");
const chatHeader = document.querySelector(".chat-header");
const chatBody = document.querySelector(".chat-body");
const chatFooter = document.querySelector(".chat-footer");
const chatInput = document.querySelector(".chat-input");
const chatSendButton = document.querySelector(".chat-send-button");

chatSendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value;
  if (!message) {
    return;
  }
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <span class="message-user">You:</span>
    <div class="message-bubble">${message}</div>
  `;
  chatBody.appendChild(messageElement);
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Play the sound to indicate that a message has been sent
  const audio = new Audio("message-sent23.mp3");
  audio.play();

  // Send the message to the chatbot and get a response
  getResponseFromChatbot(message);
}

function getResponseFromChatbot(message) {
  // Check if the user's message contains a spelling mistake
  var correctedMessage = message;
  if (message.toLowerCase().includes("sla")) {
    correctedMessage = message.toLowerCase().replace("sla", "slaw");
  }

  // This is a very basic chatbot response logic
  var response;
  if (correctedMessage.toLowerCase().includes("slaw")) {
    response = "Slaw! chon datwanm amro yarmatet bdam?";
  } else if (correctedMessage.toLowerCase().includes("xwat lagal")) {
    response = "Goodbye! Have a great day!";
  } else {
    response = "Sorry, I didn't understand what you mean. Can you rephrase your question?";
  }

  // Check if the chatbot needs to learn from this message
  if (message !== correctedMessage) {
    learnFromMessage(message, correctedMessage);
  }

  setTimeout(() => {
    const responseElement = document.createElement("div");
    responseElement.classList.add("message");
    responseElement.innerHTML = `
      <span class="message-chatbot">Chatbot:</span>
      <div class="message-bubble">${response}</div>
    `;
    chatBody.appendChild(responseElement);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Play the sound to indicate that a message has been sent
    const audio = new Audio("message-sent23.mp3");
    audio.play();
  }, 1000);
}

function learnFromMessage(originalMessage, correctedMessage) {
  console.log(`Chatbot learned: "${originalMessage}" should be corrected to "${correctedMessage}"`);

  // You can add logic here to save the correction to a database or a file, so that the chatbot can use it in the future.
}
