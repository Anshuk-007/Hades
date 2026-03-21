import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory conversation store (resets on cold start)
const conversationStore = new Map<
  string,
  Array<{ role: string; content: string }>
>();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, message } = await req.json();

    if (!session_id || !message) {
      return new Response(
        JSON.stringify({ error: "session_id and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("GROQ_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get or create conversation history
    if (!conversationStore.has(session_id)) {
      conversationStore.set(session_id, []);
    }
    const history = conversationStore.get(session_id)!;

    // Add user message
    history.push({ role: "user", content: message });

    // Build messages array with system prompt
    const messages = [
      {
        role: "system",
        content:
          "You are Obsidian, a helpful and concise AI assistant. You provide clear, well-structured answers. Use markdown formatting when appropriate.",
      },
      ...history,
    ];

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content ?? "No response generated.";

    // Store AI response in history
    history.push({ role: "assistant", content: aiMessage });

    // Cap history at 50 messages to prevent memory bloat
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }

    return new Response(
      JSON.stringify({ response: aiMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
