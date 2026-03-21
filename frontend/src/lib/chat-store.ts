export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

let sessions: Session[] = [];
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getSessions() {
  return sessions;
}

export function createSession(): Session {
  const session: Session = {
    id: crypto.randomUUID(),
    title: `Chat ${sessions.length + 1}`,
    messages: [],
    createdAt: Date.now(),
  };
  sessions = [session, ...sessions];
  notify();
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.find((s) => s.id === id);
}

export function addMessage(sessionId: string, role: "user" | "ai", content: string) {
  sessions = sessions.map((s) => {
    if (s.id !== sessionId) return s;
    const msg: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    };
    const updated = { ...s, messages: [...s.messages, msg] };
    // Auto-title from first user message
    if (role === "user" && s.messages.length === 0) {
      updated.title = content.slice(0, 30) + (content.length > 30 ? "…" : "");
    }
    return updated;
  });
  notify();
}

export function deleteSession(id: string) {
  sessions = sessions.filter((s) => s.id !== id);
  notify();
}
