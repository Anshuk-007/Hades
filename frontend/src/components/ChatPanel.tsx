import { useRef, useEffect } from "react";
import type { Message } from "@/lib/chat-store";
import MessageBubble from "./MessageBubble";
import CyberLoader from "./CyberLoader";
import { MessageSquare } from "lucide-react";

interface ChatPanelProps {
  messages: Message[];
  loading: boolean;
}

const ChatPanel = ({ messages, loading }: ChatPanelProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center neon-glow-cyan">
          <MessageSquare className="w-7 h-7 text-primary animate-glow-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-orbitron text-lg font-semibold text-primary neon-text-cyan">
            HADES ONLINE
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Initialize communication. Type a message to begin your session with the HADES AI system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {loading && <CyberLoader />}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatPanel;
