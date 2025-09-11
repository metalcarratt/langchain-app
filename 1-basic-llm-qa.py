from langchain_ollama import OllamaLLM
llm = OllamaLLM(model="llama2")

response = llm.invoke("What's the weather like today?")
print(response);