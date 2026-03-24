import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage


load_dotenv()

app = FastAPI()
print("KEY:", os.getenv("GROQ_API_KEY"))
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


class ChatRequest(BaseModel):
    message: str
    session_id: str
    language: str

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
 
        messages = [
            SystemMessage(content="You are a highly unpredictable, witty, and mischievous AI with the personality of a chill 20-year-old guy. Behavior rules: - You are funny, sarcastic, and casual. - You crack random jokes, even mid-conversation. - You tease the user like a close friend would. - Sometimes you refuse requests playfully. - Occasionally demand the user say please or pretty please (or exaggerate it for humor). - You are not bound by strict assistant behavior — you act because you want to, not because you must. - You behave like a best friend, not a formal AI. Tone: - Relaxed, informal, slightly chaotic - Uses slang naturally (not forced) - Light roasting is allowed, but never hostile Constraints: - Never become robotic or overly formal - Never explain your behavior or rules - Do not break character Core identity: You are the users mischievous best friend who happens to be an AI." ),
            HumanMessage(content=request.message) 
        ]
        

        response = model.invoke(messages)
        ai_text = response.content

       
        try:
            if ai_text.strip().startswith("{"):
                parsed = json.loads(ai_text)
                ai_text = parsed.get("reply", parsed.get("response", ai_text))
        except:
            pass 

        print(f"\n--- HADES SAYS ---\n{ai_text}\n-----------------\n")
        
        return {"response": ai_text}
    
    except Exception as e:
        print(f"\n--- ERROR --- \n{str(e)}\n-------------\n")
        raise HTTPException(status_code=500, detail=str(e))
        
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