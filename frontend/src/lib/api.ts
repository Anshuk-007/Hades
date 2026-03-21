// Configure your backend API base URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface ChatRequest {
  message: string;
  session_id: string;
  language: string;
}

export interface ChatResponse {
  response: string;
}

export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error: ${res.status}`);
  }
  return res.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

export const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "hindi", label: "हिन्दी" },
  { value: "german", label: "Deutsch" },
  { value: "french", label: "Français" },
  { value: "spanish", label: "Español" },
  { value: "japanese", label: "日本語" },
  { value: "chinese", label: "中文" },
] as const;