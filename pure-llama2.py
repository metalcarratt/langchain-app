from llama_cpp import Llama

llm = Llama(model_path="./llama-2-7b-chat.Q4_K_M.gguf")

prompt = "Q: What are the name of the days of the week?\nA:"
output = llm(prompt);

print(output["choices"][0]["text"])
