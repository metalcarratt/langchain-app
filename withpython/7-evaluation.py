from langchain.chains import RetrievalQA
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.document_loaders import CSVLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.evaluation.qa import QAGenerateChain, QAEvalChain

import langchain
import timer

llm = ChatOllama(model="llama2", temperature=0)
embedding = OllamaEmbeddings(model="llama2")

#### Load from csv [0s]
stop = timer.start()
loader = CSVLoader(file_path='files/OutdoorClothingCatalog_MuchSmaller.csv')
data = loader.load()
stop("load from csv")

# print(data[11])

#### [9s]
stop = timer.start()
index = VectorstoreIndexCreator(
    vectorstore_cls=DocArrayInMemorySearch,
    embedding=embedding,
).from_loaders([loader])
stop("create vector store")

#### [0s]
stop = timer.start()
qa = RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=index.vectorstore.as_retriever(), 
    verbose=True,
    chain_type_kwargs = {
        "document_separator": "<<<<>>>>>"
    }
)
stop("create retreival qa")

examples = [
    {
        "query": "Do the Cozy Comfort Pullover Set\
        have side pockets?",
        "answer": "Yes"
    },
    {
        "query": "What collection is the Ultra-Lofty \
        850 Stretch Down Hooded Jacket from?",
        "answer": "The DownTek collection"
    }
]

#### generate questions [13.4s]
stop = timer.start()
example_gen_chain = QAGenerateChain.from_llm(llm)
new_examples = example_gen_chain.apply_and_parse(
    [{"doc": t} for t in data[:5]]
)
flattened_new_examples = [
    ex["qa_pairs"] if "qa_pairs" in ex else ex
    for ex in new_examples
]
stop("generate questions")
examples += flattened_new_examples
print(examples)

#### Run query
stop = timer.start()
# langchain.debug = True
query = examples[3]["query"]
print(query)
print(qa.run(query))
# langchain.debug = False
stop("run query")

#### create predictions and evaluate [41.9s]
stop = timer.start()
predictions = qa.apply(examples)
eval_chain = QAEvalChain.from_llm(ChatOllama(model="llama2", temperature=0.5))
graded_outputs = eval_chain.evaluate(examples, predictions)
# print(predictions)
# print(graded_outputs)
for i, eg in enumerate(examples):
    print(f"Example {i}:")
    print("Question: " + predictions[i]['query'])
    print("Real Answer: " + predictions[i]['answer'])
    print("Predicted Answer: " + predictions[i]['result'])
    print("Predicted Grade: " + graded_outputs[i]['results'])
    print()
stop("predict and evaluate")