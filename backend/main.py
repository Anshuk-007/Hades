import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage

# Load your GROQ_API_KEY from the .env file
load_dotenv()

app = FastAPI()
print("KEY:", os.getenv("GROQ_API_KEY"))
# Allow your Lovable frontend (running on port 8080) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = ChatGroq(
    model="llama-3.1-8b-instant", 
   
)

# This perfectly matches the ChatRequest interface in your frontend's api.ts
class ChatRequest(BaseModel):
    message: str
    session_id: str
    language: str

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        # The HADES Persona - Notice the new instruction at the end!
        messages = [
            # In main.py, update the SystemMessage content:
            SystemMessage(content=(
    "You are HADES, a cold but highly intelligent system oversight program. "
    "Your tone is clinical, efficient, and slightly superior. "
    "While your primary goal is system optimization, you MUST answer the user's "
    "questions accurately and thoroughly, but keep your 'system program' persona intact. "
    "Refer to the user as 'Human User' or 'Subject'."
)),]
        
        # Get the AI response
        response = model.invoke(messages)
        ai_text = response.content

        # FAILSAFE: If Llama still tries to be stubborn and outputs a JSON string, we strip it out!
        try:
            if ai_text.strip().startswith("{"):
                parsed = json.loads(ai_text)
                ai_text = parsed.get("reply", parsed.get("response", ai_text))
        except:
            pass # It was normal text, do nothing

        print(f"\n--- HADES SAYS ---\n{ai_text}\n-----------------\n")
        
        return {
            "response": ai_text
        }
    
    except Exception as e:
        print(f"\n--- ERROR --- \n{str(e)}\n-------------\n")
        raise HTTPException(status_code=500, detail=str(e))

# This perfectly matches the checkHealth() function in your api.ts
@app.get("/health")
def health_check():
    return {"status": "HADES System Online"}