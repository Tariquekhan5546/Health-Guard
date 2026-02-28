// Developed by [Tarique Khan]
document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById('chaticon');
    const chatWindow = document.getElementById('chatwindow');
    const closeChatButton = document.getElementById('closechat');
    const resetChat = document.getElementById('resetchat');
    const minimizeChat = document.getElementById('minimizechat');
    const sendMessage = document.getElementById('sendmessage');
    const chatBody = document.getElementById('chatbody');
    const messageInput = document.getElementById('messageinput');
    const openChatFromNav = document.getElementById('openChatFromNav');
    const voiceSearch = document.getElementById('voicesearch'); 
    chatWindow.style.display = 'none';

    chatIcon.addEventListener('click', function () {
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'block' : 'none';
    });

    if (openChatFromNav) {
        openChatFromNav.addEventListener('click', function () {
            chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'block' : 'none';
        });
    }

    closeChatButton.addEventListener('click', function () {
        chatWindow.style.display = 'none';
    });

    resetChat.addEventListener('click', function () {
        chatBody.innerHTML = '<div class="message bot-message">Hello! How may I assist you?</div>';

        // Reset Chat History in Backend
        fetch('/api/reset-chat', { method: 'POST' });
    });

    minimizeChat.addEventListener('click', function () {
        chatWindow.style.display = 'none';
    });

    sendMessage.addEventListener('click', async function () {
        const userMessage = messageInput.value.trim();
        if (userMessage !== '') {
            // Display user's message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user-message');
            userMessageDiv.textContent = userMessage;
            chatBody.appendChild(userMessageDiv);
            messageInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Create "loading dots" indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot-message', 'typing');
            typingIndicator.innerHTML = "<span class='dot'></span><span class='dot'></span><span class='dot'></span>";
            chatBody.appendChild(typingIndicator);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Check for local responses first
            let botResponse = getBotResponse(userMessage);
            if (!botResponse) {
                // Fetch from Perplexity API
                botResponse = await fetchPerplexityResponse(userMessage);
            }

            // Remove "loading dots" after 1s and show actual response
            setTimeout(function () {
                typingIndicator.remove();

                const botResponseDiv = document.createElement('div');
                botResponseDiv.classList.add('message', 'bot-message');
                botResponseDiv.innerHTML = marked.parse(botResponse);
                chatBody.appendChild(botResponseDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage.click();
        }
    });

    // ✅ Fetch AI Response from Perplexity API
    async function fetchPerplexityResponse(query) {
        try {
            const response = await fetch('/api/chat', { // Point to your Node.js backend endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });
            const data = await response.json();
            return data.reply || "Sorry, I couldn't process your request at the moment.";
        } catch (error) {
            console.error('Error fetching Perplexity response:', error);
            return "Sorry, I couldn't process your request at the moment.";
        }
    }

    function getBotResponse(userMessage) {
        const responses = {
            "what is your name": "I’m your virtual assistant here to help you with information.",
            "who created you": "I was created by a team of developers to assist users like you.",
            "tell me a joke": "Why did the computer go to the doctor? Because it had a virus!",
            "what can you do": "I can provide information, answer questions, and guide you through the website.",
            "thank you": "You're welcome! If you have more questions, feel free to ask!",
            "help": "Sure! What do you need help with?"
        };
        for (let keyword in responses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                return responses[keyword];
            }
        }
        return null;
    }

    // Voice search
    voiceSearch.addEventListener('click', function () {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        voiceSearch.classList.add('active');
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            messageInput.value = transcript;
        };

        recognition.onend = function () {
            voiceSearch.classList.remove('active');
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error detected: ' + event.error);
            voiceSearch.classList.remove('active');
        };
    });
});
