import { useState, useCallback, useSyncExternalStore } from "react";
import TronBackground from "@/components/TronBackground";
import Navbar from "@/components/Navbar";
import ChatPanel from "@/components/ChatPanel";
import ChatInput from "@/components/ChatInput";
import SessionSidebar from "@/components/SessionSidebar";
import { sendMessage } from "@/lib/api";
import {
  getSessions,
  subscribe,
  createSession,
  getSession,
  addMessage,
  deleteSession,
} from "@/lib/chat-store";
import { toast } from "sonner";

const Index = () => {
  const sessions = useSyncExternalStore(subscribe, getSessions);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeSession = activeId ? getSession(activeId) : null;

  const handleNewSession = useCallback(() => {
    const s = createSession();
    setActiveId(s.id);
  }, []);

  const handleSend = useCallback(
    async (message: string) => {
      let sid = activeId;
      if (!sid) {
        const s = createSession();
        sid = s.id;
        setActiveId(sid);
      }
      addMessage(sid, "user", message);
      setLoading(true);
      try {
        const res = await sendMessage({ message, session_id: sid, language });
        
        // --- CLEAN HADES OUTPUT ---
        let aiText = "";

        // Check if the response is an object with a 'reply' or 'response' key
        if (res && typeof res === 'object') {
          aiText = res.reply || res.response || res.message;
        } 
        
        // If it's a raw string that looks like JSON, try to parse it
        if (!aiText && typeof res === 'string') {
          try {
            const parsed = JSON.parse(res);
            aiText = parsed.reply || parsed.response || res;
          } catch {
            aiText = res; // It's just a normal string
          }
        }

        // Failsafe if everything is empty
        if (!aiText || aiText.trim() === "" || aiText === "{}") {
          aiText = "SYSTEM ALERT: HADES generated a blank response.";
        }

        addMessage(sid, "ai", aiText);
        // ------------------------------

      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to get response", { description: msg });
        addMessage(sid, "ai", `⚠ Error: ${msg}`);
      } finally {
        setLoading(false);
      }
    },
    [activeId, language],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteSession(id);
      if (activeId === id) {
        const remaining = getSessions();
        setActiveId(remaining.length > 0 ? remaining[0].id : null);
      }
    },
    [activeId],
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TronBackground />
      <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />

      <div className="flex flex-1 overflow-hidden">
        <SessionSidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={handleNewSession}
          onDelete={handleDelete}
          open={sidebarOpen}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatPanel messages={activeSession?.messages ?? []} loading={loading} />
          <ChatInput
            onSend={handleSend}
            disabled={loading}
            language={language}
            onLanguageChange={setLanguage}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
