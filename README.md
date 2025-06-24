````markdown
# Code Explanation AI Agent

A simple and functional React-based split-window application that connects with a Large Language Model (LLM) API (such as OpenAI's GPT) to explain code line by line and detect logical errors.

---

## Features

- **Split Interface**:  
  Left pane for code input, right pane for line-by-line explanation.

- **AI-Powered Code Analysis**:  
  Uses an LLM to:
  - Explain code logic.
  - Detect logical bugs and point out the lines causing them.

- **Flexible Language Support**:  
  Analyze code in multiple programming languages.

- **Expandable Features** (optional / creative additions):
  - Syntax highlighting
  - AI-generated suggestions
  - Code formatting
  - Inline comments generation

---

## Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js / Express (or Python Flask/FastAPI)  
- **API**: OpenAI GPT API (or any LLM with code interpretation ability)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- OpenAI API Key (or compatible LLM API)

### Installation

```bash
git clone https://github.com/your-username/Coding-AI-Agent.git
cd Coding-AI-Agent
npm install
````

### Running the App

```bash
npm start
```

### Set Up Your API Key

Create a `.env` file in the root with:

```
REACT_APP_OPENAI_API_KEY=your_openai_key_here
```

---

## 📁 Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main component with split layout
│   │   ├── CodeInput.js  # Code editor component
│   │   └── Output.js     # Explanation display
├── backend/
│   └── server.js         # Handles API requests to OpenAI
```

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

* [OpenAI API](https://platform.openai.com/)
* React & Node.js community
