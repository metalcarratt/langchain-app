from langchain_ollama import ChatOllama
import time
llm = ChatOllama(model="llama2")

def callLlm(message):
    print('---- Message ----')
    print(message)
    print('---- End Msg ----')

    start_time = time.time()
    response = llm.invoke(message)
    duration = time.time() - start_time
    
    print('---- LLM Response ----')
    print(response.content);
    print('---- End Response ----')
    print(f" | Took {duration: .1f} seconds")
    
    return response.content

