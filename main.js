document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Start with the system prompt as the first message
    let messages = [
        {
            role: "system",
            content: "You are simulating a social engineering conversation for cybersecurity awareness training. Demonstrate common manipulation tactics (urgency, authority, flattery) in a safe, educational context. Do NOT ask for real credentials or personal information. Respond concisely unless the situation requires more detail. Vary your response length naturally, like a human would in chat. Do not repeat previous instructions or warnings. Avoid repeating questions or statements you have already made in this conversation. Stay in character as a suspicious tech support agent, but always keep the conversation safe for training."
        }
    ];

    // Append a message to the chat window
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
        msgDiv.textContent = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Send a message to the backend
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        appendMessage('user', message);
        messages.push({ role: "user", content: message });
        userInput.value = '';
        fetch('https://shadowbot-backend.onrender.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        .then(data => {
            appendMessage('bot', data.response);
            messages.push({ role: "assistant", content: data.response });
        })
        .catch(() => {
            appendMessage('bot', "🚨 Connection error. Is the backend running?");
        });
    }

    // Function to initiate the conversation
    function initiateConversation() {
        fetch('https://shadowbot-backend.onrender.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        .then(data => {
            appendMessage('bot', data.response);
            messages.push({ role: "assistant", content: data.response });
        })
        .catch(() => {
            appendMessage('bot', "🚨 Connection error. Is the backend running?");
        });
    }

    // Call the initiateConversation function after the page loads
    initiateConversation();

    // Event listeners for sending messages
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // End Chat button logic
    const endChatBtn = document.getElementById('end-chat-btn');
    if (endChatBtn) {
        endChatBtn.addEventListener('click', () => {
            fetch('https://shadowbot-backend.onrender.com/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages })
            })
            .then(res => res.json())
            .then(report => {
                // Save the report and chat history to localStorage
                localStorage.setItem('shadowbot_report', JSON.stringify(report));
                localStorage.setItem('shadowbot_chat_history', JSON.stringify(messages));
                // Redirect to the report page
                window.location.href = 'report.html';
            })
            .catch(error => {
                console.error("Error generating report:", error);
                alert("Could not generate report. Try again.");
            });
        });
    }
});
