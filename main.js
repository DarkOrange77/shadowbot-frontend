document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let typingIndicator = null;

    const messages = [
        {
            role: "system",
            content: "You are simulating a social engineering conversation for cybersecurity awareness training. Demonstrate common manipulation tactics (urgency, authority, flattery) in a safe, educational context. Do NOT ask for real credentials or personal information. Respond concisely unless the situation requires more detail. Vary your response length naturally, like a human would in chat. Do not repeat previous instructions or warnings. Avoid repeating questions or statements you have already made in this conversation. Stay in character as a suspicious tech support agent, but always keep the conversation safe for training."
        }
    ];

    // Append message bubble
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
        msgDiv.textContent = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.textContent = 'ShadowBot is typing...';
        chatWindow.appendChild(typingIndicator);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.parentNode.removeChild(typingIndicator);
        }
    }

    // Send message to backend
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage('user', message);
        messages.push({ role: "user", content: message });
        userInput.value = '';

        showTypingIndicator();

        fetch('https://shadowbot-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        .then(data => {
            removeTypingIndicator();
            appendMessage('bot', data.response);
            messages.push({ role: "assistant", content: data.response });
        })
        .catch(() => {
            removeTypingIndicator();
            appendMessage('bot', "🚨 Connection error. Is the backend running?");
        });
    }

    // Start initial bot message
    function initiateConversation() {
        showTypingIndicator();
        fetch('https://shadowbot-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        .then(data => {
            removeTypingIndicator();
            appendMessage('bot', data.response);
            messages.push({ role: "assistant", content: data.response });
        })
        .catch(() => {
            removeTypingIndicator();
            appendMessage('bot', "🚨 Connection error. Is the backend running?");
        });
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // End chat and generate report
    const endChatBtn = document.getElementById('end-chat-btn');
    if (endChatBtn) {
        endChatBtn.addEventListener('click', () => {
            fetch('https://shadowbot-backend.onrender.com/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages })
            })
            .then(res => res.json())
            .then(report => {
                localStorage.setItem('shadowbot_report', JSON.stringify(report));
                localStorage.setItem('shadowbot_chat_history', JSON.stringify(messages));
                window.location.href = 'report.html';
            })
            .catch(error => {
                console.error("Error generating report:", error);
                alert("Could not generate report. Try again.");
            });
        });
    }

    initiateConversation(); // Load first message
});
