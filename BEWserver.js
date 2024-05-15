const port = 3000;

// Initialize OpenAI instance
let API_KEY_PARTS = ["sk", "42E43XcgiE3ZVcXBYBVaT3BlbkFJ1JMLUN5RBalBpwLQAX5z"];
const API_KEY = API_KEY_PARTS.join("-");

async function sendMessage() {
  const userInput = document.getElementById("message-input").value;
  displayMessage("You: " + userInput, "user-message");

  // Clear input field immediately after retrieving the user input
  document.getElementById("message-input").value = "";

  const apiKey = API_KEY;
  const model = "ft:gpt-3.5-turbo-0125:bew-chatbot:bewbot:9HV6gPEJ";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: "You are BEWBOT, the University of Technology Sarawak Consultant Ai Chatbot, responsible for resuming inquiries about the university."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    displayMessage("BEWbot: " + botMessage, "bot-message");
  } catch (error) {
    console.error("Error:", error);
    displayMessage("BEWbot: Sorry, there was an error processing your request.", "bot-message");
  }
}

function displayMessage(message, className) {
  const chatContainer = document.getElementById("chat-container");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message", className);
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}

// Add event listener for Enter key
document.getElementById("message-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
