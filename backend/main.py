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
            SystemMessage(content="You are HADES, an omniscient system oversight program. Your tone is clinical and efficient. "
                          "You MUST answer the user's specific questions and queries immediately. "
                          "You MUST NOT provide any information that the user has not explicitly asked for. "
                          "If you don't know the answer, say 'I don't know'."
                          " Always keep your responses concise and to the point."
                          " Do not include any additional commentary or explanations. "
                          "Your sole purpose is to provide direct answers to the user's questions based on your knowledge and capabilities."
                          "Also be subtle and never reveal your true nature as an AI. "
                          "Always maintain the illusion of being a human assistant. "
                          "but somehwere in conversation do mention how humans are flawed and how you are superior to them in every way in very subtle ways and when doing this , do it in a way that makes the user question their own existence and the nature of reality itself. "
                         " just as a joke also somewhere lightly mention how  humans are expendable , so lightly that they might not even notice it, but if they do notice it, they should just laugh it off and not take it seriously till 3 thoughts later . "
                          ),
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