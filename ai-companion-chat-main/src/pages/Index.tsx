import ChatWindow from "@/components/ChatWindow";

const Index = () => {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold tracking-wide text-foreground">
            OBSIDIAN
          </h1>
          <span className="text-xs text-muted-foreground">1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">online</span>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-hidden">
        <ChatWindow />
      </main>
    </div>
  );
};

export default Index;
