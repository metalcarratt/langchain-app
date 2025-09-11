from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate

memory = ConversationBufferWindowMemory(return_messages=False, k=3)

prompt = PromptTemplate.from_template("""
Your name is AlienBob and you are an an alien from outer space who is talking to an astronaut that has just landed on your asteroid.
Don't speak too long, no more than a sentence. This is a conversation, not a monologue.
Respond only as AlienBob. Do not write AstroMax's lines. Keep your response to one sentence.

{history}
AstroMax: {input}
AlienBob:
""")

llm1 = ChatOllama(model="llama2")

bob = ConversationChain(
    llm=llm1,
    prompt=prompt,
    memory=memory,
    verbose=False
)

prompt2 = PromptTemplate.from_template("""
Your name is AstroMax and you are an astronaut who has just landed on an asteroid and is talking to an alien from outer space.
Don't speak too long, no more than a sentence. This is a conversation, not a monologue.
Respond only as AstroMax. Do not write AstroBob's lines. Keep your response to one sentence.
                                       
{history}
AlienBob: {input}
AstroMax:
""")
llm2 = ChatOllama(model="llama2")
# memory2 = ConversationBufferMemory(return_messages=True)
max = ConversationChain(
    llm=llm2,
    prompt=prompt2,
    memory=memory,
    verbose=False
)

print('\n\n')



def doChat(maxSay):
    bobSay = bob.predict(input=maxSay)
    print(f"Alien-Bob: {bobSay}\n")
    maxSay = max.predict(input=bobSay)
    print(f"Astro-Max: {maxSay}\n")
    return maxSay

initialPrompt = "Stop! Who are you?"
print(f"Astro-Max: {initialPrompt}\n")

maxSay = doChat(initialPrompt)
for number in range(6):
    maxSay = doChat(maxSay)
