# vectors, aka, RAG (retrieval-augmented generation)
# from langchain.chains import RetrievalQA
# from langchain.chat_models import ChatOpenAI

from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.document_loaders import CSVLoader
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorstoreIndexCreator
import withpython.timer as timer

llm = ChatOllama(model="llama2", temperature=0)
embedding = OllamaEmbeddings(model="llama2")

loader = CSVLoader(file_path='files/OutdoorClothingCatalog_MuchSmaller.csv')

index = VectorstoreIndexCreator(
    embedding=embedding,
    vectorstore_cls=DocArrayInMemorySearch
).from_loaders([loader])

query ="Please list all your shirts with sun protection in a table in markdown and summarize each one."

stop = timer.start()
response = index.query(query, llm=llm)
stop("")
print(response)
