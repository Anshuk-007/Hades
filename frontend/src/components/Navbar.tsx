import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/api";
import { Zap, Menu } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [healthy, setHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => checkHealth().then(setHealthy);
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-4 glass-panel border-b border-border/50 relative z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-accent transition-colors text-primary"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary animate-glow-pulse" />
          <h1 className="font-orbitron text-sm font-bold tracking-widest text-primary neon-text-cyan">
            HADES
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-muted-foreground">API</span>
        <div
          className={`w-2 h-2 rounded-full ${
            healthy === null
              ? "bg-muted-foreground"
              : healthy
              ? "bg-green-400 shadow-[0_0_6px_hsl(120,80%,50%)]"
              : "bg-destructive shadow-[0_0_6px_hsl(0,80%,50%)]"
          }`}
        />
        <span className="text-muted-foreground hidden sm:inline">
          {healthy === null ? "checking…" : healthy ? "online" : "offline"}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
