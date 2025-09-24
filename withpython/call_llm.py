from langchain_ollama.llms import OllamaLLM
import time
llm = OllamaLLM(model="llama2")

def callLlm(message):
    print('---- Message ----')
    print(message)
    print('---- End Msg ----')

    start_time = time.time()
    response = llm.invoke(message)
    duration = time.time() - start_time
    
    print('---- LLM Response ----')
    print(response);
    print('---- End Response ----')
    print(f" | Took {duration: .1f} seconds")
    
    return response

