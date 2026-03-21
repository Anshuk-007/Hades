const TronBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 100% 50% / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 100% 50% / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "grid-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, hsl(0 100% 50% / 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, hsl(15 100% 55% / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, hsl(345 100% 60% / 0.03) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 100% 50% / 0.3) 2px, transparent 4px)",
        }}
      />
    </div>
  );
};

export default TronBackground;
