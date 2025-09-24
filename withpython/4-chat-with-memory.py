from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_ollama import ChatOllama

llm = ChatOllama(model="llama2")
memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

result = conversation.predict(input="Hi, my name is Caleb")
print(result)

result = conversation.predict(input="What is 1+1?")
print(result)

result = conversation.predict(input="What is my name?")
print(result)
