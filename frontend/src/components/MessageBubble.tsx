import type { Message } from "@/lib/chat-store";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div
        className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-secondary/15 border border-secondary/30 text-foreground neon-glow-orange"
            : "glass-panel border-primary/20 text-foreground neon-glow-cyan"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[10px] font-orbitron font-semibold tracking-wider uppercase ${
              isUser ? "text-secondary" : "text-primary"
            }`}
          >
            {isUser ? "you" : "hades"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
