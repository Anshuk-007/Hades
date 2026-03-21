const CyberLoader = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="glass-panel border-primary/20 neon-glow-cyan px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-orbitron font-semibold tracking-wider uppercase text-primary">
            ares
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animation: "glow-pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground font-mono">processing…</span>
        </div>
      </div>
    </div>
  );
};

export default CyberLoader;
