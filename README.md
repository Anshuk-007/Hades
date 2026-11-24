# HADES AI — Context-Aware Conversational Chatbot

HADES AI is a conversational AI chatbot powered by **Llama 3.1**, integrated through the Groq API and built using LangChain. It supports session-based conversation memory, allowing users to maintain contextual conversations across multiple interactions.

The project explores the integration of Large Language Models (LLMs), conversational memory, and application deployment.

## Features

- **LLM Integration:** Uses Llama 3.1 through Groq for conversational response generation.
- **Session-Based Memory:** Maintains separate conversation histories for individual sessions.
- **Context-Aware Responses:** Uses previous messages to generate contextually relevant responses.
- **Multiple Sessions:** Supports independent conversations without mixing their histories.
- **Web Interface:** Interactive chat interface with session management and language selection.
- **Cloud Deployment:** Backend deployed on Render.

## Tech Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| LLM | Llama 3.1 |
| LLM Provider | Groq API |
| Framework | LangChain |
| Conversation Memory | LangChain Chat Message History |
| Frontend | AI-generated interface |
| Deployment | Render |

## System Architecture

```text
       User
        |
        v
  HADES AI Interface
  (AI-generated UI)
        |
        v
   Backend Logic
        |
        v
     LangChain
        |
        v
  Session Management
        |
        v
   Groq API
        |
        v
    Llama 3.1
        |
        v
  Generated Response
        |
        v
       User
```

## How It Works

1. A user initiates a conversation through the chat interface.
2. A unique session identifier maintains the conversation context.
3. LangChain manages conversation history associated with the session.
4. User messages are processed and passed to the Llama 3.1 model through Groq.
5. The generated response is returned to the user while maintaining conversational context.

## Future Improvements

- Explore techniques for reducing LLM hallucinations.
- Improve factual consistency and response reliability.
- Experiment with Retrieval-Augmented Generation (RAG).
- Explore persistent conversation storage.
- Evaluate response quality across different LLM configurations.

## Contribution

The backend chatbot logic, LangChain integration, and session-memory implementation were developed through the Python notebook workflow.

The frontend interface was generated using AI-assisted development tools (vibe coding) and integrated with the deployed backend.

## Deployment

The backend is hosted on Render.

**Project:** HADES AI
