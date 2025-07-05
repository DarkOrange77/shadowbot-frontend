# ShadowBot

ShadowBot is a simulated social engineering chatbot designed for cybersecurity awareness, training, and demonstration purposes. It mimics real-world phishing and social engineering tactics in a safe, controlled environment, allowing users to experience and learn how to recognize suspicious interactions.

---

## 🚀 Features

- **Realistic Social Engineering Scenarios:** ShadowBot generates convincing phishing and social engineering messages.
- **Interactive Chat Console:** Users can chat with ShadowBot in a web-based console.
- **Customizable Backend:** Powered by Flask and integrates with LLM APIs (e.g., Together.ai).
- **Modern UI:** Responsive, dark-themed frontend with animated space background.
- **Easy Deployment:** Deployable on Render, Glitch, or any Python-compatible cloud platform.

---

## 🖥️ Demo

![Screenshot of a conversation](https://github.com/user-attachments/assets/f2ceba79-e71b-44eb-aab5-896531b70e3f)


---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask)
- **API Integration:** Together.ai (or other LLM APIs)
- **Deployment:** Render (recommended), Glitch, or locally

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/shadowbot-backend.git
cd shadowbot-backend
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Environment Variables

Create a `.env` file in the backend directory:

```
TOGETHER_API_KEY=your_together_api_key_here
```

### 4. Run Locally

```bash
gunicorn app:app
```
Or for development:
```bash
python app.py
```

### 5. Access the App

Open your browser and go to `http://localhost:5000` (or the port specified).

---

## 🌐 Deployment (Render Example)

1. Push your code to GitHub.
2. Create a new Web Service on [Render](https://render.com/).
3. Set the build command:  
   ```
   pip install -r requirements.txt
   ```
4. Set the start command:  
   ```
   gunicorn app:app
   ```
5. Add your `TOGETHER_API_KEY` in the Render environment variables.
6. Deploy and get your public URL!

---

## 📂 Project Structure

```
shadowbot-backend/
│
├── backend/
│   ├── app.py
│   ├── .env
│   └── ...
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── requirements.txt
└── README.md
```

---

## ⚠️ Disclaimer

**ShadowBot is for educational and awareness purposes only.**  
Do not use this tool for malicious activities. Always follow ethical guidelines and obtain proper authorization before conducting any security testing or training.

---

## 📧 Contact

For questions, suggestions, or contributions, open an issue or contact [Delora](mailto:bezz39587@gmail.com).

---
