from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain, SequentialChain
import pandas as pd

df = pd.read_csv('files/Data.csv')
llm = ChatOllama(model="llama2", temperature=0.9)

chain1 = LLMChain(
    llm=llm, 
    prompt=ChatPromptTemplate.from_template("Translate the following review to English: {Review}"),
    output_key="English_Review"
)

chain2 = LLMChain(
    llm=llm,
    prompt = ChatPromptTemplate.from_template("Can you summarize the following review in one sentence: {English_Review}"),
    output_key="Summary"
)

chain3 = LLMChain(
    llm=llm,
    prompt = ChatPromptTemplate.from_template("What language is the following review: {Review}"),
    output_key="Language"
)

chain4 = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template("Write a follow up response to the following summary in the specified language: \n\nSummary: {Summary}\n\nLanguage: {Language}"),
    output_key="Followup_Message"
)

overallChain = SequentialChain(
    chains=[chain1, chain2, chain3, chain4],
    input_variables=["Review"],
    output_variables=["English_Review", "Summary", "Followup_Message"],
    verbose=True
)

review = df.Review[5]
result = overallChain(review)

print(result)