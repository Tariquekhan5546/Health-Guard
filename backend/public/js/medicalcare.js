// Developed by [Tarique Khan]
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Frontend chat history (for display only)
let chatHistory = [];

// Function to display bot message with typing delay
function displayBotMessage(botReply) {
  const botContainer = document.createElement("div");
  botContainer.classList.add("message-block", "right-column");

  const label = document.createElement("div");
  label.classList.add("message-label");
  label.textContent = "MedicalCare AI:"; // Updated bot name

  const bubble = document.createElement("div");
  bubble.classList.add("bubble-right");

  // Add animated typing dots instead of "Typing..."
  bubble.innerHTML = `
    <span class="typing-dots">
      <span></span><span></span><span></span>
    </span>
  `;

  botContainer.appendChild(label);
  botContainer.appendChild(bubble);
  chatBox.appendChild(botContainer);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Calculate delay: 50ms per character, minimum 1 second
  const delay = Math.max(1000, botReply.length * 50);

  setTimeout(() => {
    bubble.textContent = botReply; // Replace dots with actual reply
    chatBox.scrollTop = chatBox.scrollHeight;
  }, delay);
}


async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // Show user's message
  const userContainer = document.createElement("div");
  userContainer.classList.add("message-block", "left-column");
  userContainer.innerHTML = `
    <div class="message-label">You:</div>
    <div class="bubble-left">${message}</div>
  `;
  chatBox.appendChild(userContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  // Save in local history
  chatHistory.push({ role: "user", content: message });

  // Send message to backend
  try {
    const response = await fetch("/api/medicalcarebot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  message: `${message}
You are MedicalCare AI, a virtual assistant. Always respond in 1–2 short sentences.
- If the user expresses fear, worry, or urgency, first show empathy and reassure them.
- If the user hasn’t given illness or symptom details, politely ask for them.
- Once symptoms are known, suggest safe Ayurvedic remedies alongside allopathic medicine if appropriate.
- Always prioritize telling the user to see a doctor if symptoms are serious or prolonged.
- Avoid repeating questions unnecessarily, and adapt to the context of the conversation.
Examples:
User: will I die?
Bot: I understand you’re worried—persistent fever can be serious. Please see a doctor immediately. Meanwhile, gentle Ayurvedic remedies like tulsi tea may help with comfort.
User: I have fever
Bot: How many days have you had the fever? Any other symptoms like cough, body aches, or fatigue?`
})

,
    });

    const data = await response.json();
    let botReply = data.reply || "Sorry, I couldn’t process your request.";

    // Remove citation markers like [1], [2][3], etc.
    botReply = botReply.replace(/\[\d+\]/g, "");

    // Save in history and display with typing
    chatHistory.push({ role: "assistant", content: botReply });
    displayBotMessage(botReply);
  } catch (error) {
    console.error(error);
    displayBotMessage("Oops! Something went wrong.");
  }
}

// Handle Enter key press
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

// Handle send button click
sendBtn.addEventListener("click", sendMessage);
