from langchain.chains import RetrievalQA

from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.document_loaders import CSVLoader
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorstoreIndexCreator
import withpython.timer as timer

llm = ChatOllama(model="llama2", temperature=0)
embedding = OllamaEmbeddings(model="llama2")



#### Load from csv
stop = timer.start()
loader = CSVLoader(file_path='files/OutdoorClothingCatalog_MuchSmaller.csv')
docs = loader.load()
stop("load from csv")
# print(docs[1])

#### test embeddings
# embed = embedding.embed_query("Hi my name is Harrion")
# embed2 = embedding.embed_query("Hi my name is Caleb")
# embed3 = embedding.embed_query("Hi my son is Harison")
# print(len(embed))
# print(embed[:5])
# print(len(embed2))
# print(embed2[:5])
# print(len(embed3))
# print(embed3[:5])

#### build doc array 
stop = timer.start()
db = DocArrayInMemorySearch.from_documents( # this step takes a long time ~7s for 10 docs
    docs,
    embedding
)
retriever = db.as_retriever()
stop("build doc arary")

#### similarity search (fast)
# query = "Please suggest a shirt with sunblocking"
# docs = db.similarity_search(query)
# print(len(docs))
# print(docs[0])

#### The call_as_llm takes around 26.2s
# stop = timer.start()
# qdocs = "".join([docs[i].page_content for i in range(len(docs))])
# response = llm.call_as_llm(f"{qdocs} Question: Please list all your shirts with sun protection in a table in markdown and summarize each one.")
# print(response)
# stop("qdocs")

query =  "Please list all your shirts with sun protection in a table in markdown and summarize each one."
#### qa stuff ~9.8s. [[ according to copilot this is actually the most production-ready one because it's more easily optimised ]]
# stop = timer.start()
# qa_stuff = RetrievalQA.from_chain_type(
#     llm=llm, 
#     chain_type="stuff", 
#     retriever=retriever, 
#     verbose=True
# )
# response = qa_stuff.run(query)
# print(response)
# stop("qa stuff")

#### vector store index query ~ 12.5s
stop = timer.start()
index = VectorstoreIndexCreator(
    vectorstore_cls=DocArrayInMemorySearch,
    embedding=embedding,
).from_loaders([loader])
response = index.query(query, llm=llm)
print(response)
stop("vector index")