

## TRON: Ares AI Chatbot — Frontend Only

A futuristic, TRON-inspired chatbot interface built in React with a configurable backend API URL. You'll connect your own FastAPI/Groq backend later.

### Pages & Layout

1. **Main Chat Dashboard** (single page app)
   - Full-screen dark layout with animated grid/circuit background pattern
   - Futuristic navbar with glowing TRON-style logo, app title, and session controls
   - Split layout: chat panel (center), optional collapsible sidebar (left) for session list

### Chat Interface
- **Message input panel** at the bottom with glowing neon border, send button with pulse animation
- **Language selector** dropdown (English, Hindi, German, etc.) matching your notebook's multi-language feature
- **Message bubbles**: User messages (right, orange/amber glow), AI messages (left, cyan glow) with markdown rendering
- **Typing indicator**: Cyber-style scanning line animation while waiting for response
- **Session management**: Create new chat sessions, switch between them (sidebar)

### TRON: Ares Design System
- **Colors**: Pure black background (#000), deep navy panels, cyan (#00FFFF) primary accents, orange (#FF6600) secondary accents
- **Glassmorphism**: Semi-transparent panels with backdrop blur and neon borders
- **Typography**: Monospace/digital font (Orbitron or similar via Google Fonts)
- **Animations**: Pulsing glow effects on interactive elements, scanning line loader, smooth hover transitions with neon shadow scaling
- **Grid pattern**: Subtle animated circuit-board grid in the background using CSS

### Configurable Backend
- API base URL stored in a config constant (easy to change)
- Calls `POST /chat` with `{ message, session_id, language }` and expects `{ response }` back
- Calls `GET /health` to show backend connection status indicator in navbar
- Full error handling: loading states, error toasts, retry option
- All API calls go through a single service file for easy backend swapping

### Components
- `TronBackground` — animated grid/circuit CSS background
- `Navbar` — glowing minimal nav with health status dot
- `ChatPanel` — message list with auto-scroll
- `MessageBubble` — styled user/AI messages with markdown support
- `ChatInput` — input field + language selector + send button
- `SessionSidebar` — collapsible session list with neon styling
- `CyberLoader` — scanning line / pulse animation spinner

