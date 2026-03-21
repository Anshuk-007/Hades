import { Plus, Trash2, MessageCircle } from "lucide-react";
import type { Session } from "@/lib/chat-store";

interface SessionSidebarProps {
  sessions: Session[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  open: boolean;
}

const SessionSidebar = ({ sessions, activeId, onSelect, onCreate, onDelete, open }: SessionSidebarProps) => {
  if (!open) return null;

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-border/50 flex flex-col h-full">
      <div className="p-3 border-b border-border/50 flex items-center justify-between">
        <span className="font-orbitron text-[10px] font-semibold tracking-widest uppercase text-primary">
          Sessions
        </span>
        <button
          onClick={onCreate}
          className="p-1.5 rounded-md hover:bg-accent text-primary transition-colors"
          title="New session"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sessions.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">No sessions yet</p>
        )}
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all text-sm ${
              s.id === activeId
                ? "bg-primary/10 border border-primary/30 text-primary neon-glow-cyan"
                : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 truncate font-mono text-xs">{s.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(s.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SessionSidebar;
