import { useState } from "react";
import { Send, Globe } from "lucide-react";
import { LANGUAGES } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const ChatInput = ({ onSend, disabled, language, onLanguageChange }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 glass-panel border-t border-border/50">
      <div className="flex items-center gap-2">
        {/* Language selector */}
        <div className="hidden sm:flex items-center">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[120px] h-9 bg-accent/50 border-border/50 text-xs font-mono text-foreground">
              <Globe className="w-3 h-3 mr-1 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs font-mono">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Input */}
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message…"
            disabled={disabled}
            className="w-full h-10 bg-accent/30 border border-border/50 rounded-md px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:neon-glow-cyan transition-all font-mono disabled:opacity-50"
          />
        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:neon-glow-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
