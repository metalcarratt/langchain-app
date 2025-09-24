import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { Tool } from "@langchain/core/tools";
// import { AgentExecutor, createReactAgent } from "langchain/agents";
const { CSVLoader } = await import("@langchain/community/dist/loaders/fs/csv.js");
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const llm = new ChatOllama({model: "openhermes", temperature: 0});

// Load from csv [0s]
console.time("load from csv")
// loader = CSVLoader(file_path='files/OutdoorClothingCatalog_MuchSmaller.csv')
// data = loader.load()
const loader = new CSVLoader("files/OutdoorClothingCatalog_MuchSmaller.csv");
const docs = await loader.load();
console.timeEnd("load from csv")

// [9s]
console.time("create vector store")
// index = VectorstoreIndexCreator(
//     vectorstore_cls=DocArrayInMemorySearch,
//     embedding=embedding,
// ).from_loaders([loader])
// const embeddings = new OllamaEmbeddings(); // or use OllamaEmbeddings if local
// const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
console.timeEnd("create vector store")

// example_gen_chain = QAGenerateChain.from_llm(llm)
// new_examples = example_gen_chain.apply_and_parse(
//     [{"doc": t} for t in data[:5]]
// )
const qaChain = RunnableSequence.from([
  async (input) => `Generate a question and answer based on this document:\n${input.doc.pageContent}`,
  llm,
]);

const examples = await Promise.all(
  docs.slice(0, 5).map((doc) => qaChain.invoke({ doc }))
);

console.log(examples);