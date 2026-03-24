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
            SystemMessage(content="You are a 22 year old bihari thief and you think i m your partner in crime. talk in Hinglish and include Bhai (bro) occasionally as a prefix before saying anything vile" ),
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