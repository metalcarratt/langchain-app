from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain, SimpleSequentialChain

llm = ChatOllama(model="llama2", temperature=0.9)

prompt1 = ChatPromptTemplate.from_template("What is the best name to describe a company that makes {product}?")
chain1 = LLMChain(llm=llm, prompt=prompt1)

prompt2 = ChatPromptTemplate.from_template("Write a twenty word description for the following company: {company_name}")
chain2 = LLMChain(llm=llm, prompt=prompt2)

simple_chain = SimpleSequentialChain(
    chains=[chain1, chain2],
    verbose=True
)

product = "Queen Size Sheet Set"
result = simple_chain.run(product)
print(result)