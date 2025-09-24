# Gen-AI

AI - systems for emulating human intelilgence
ML - machine learning, learn from existing data and make predictions it wasn’t programmed to make
Deep learning - using neural networks for ML (unsupervised)
  - supervised (given labelled data)
  - unsupervised (given no labels on data)
  - semi-supervised (given initial training on a small set of labelled data and then trained on unlabelled data)

Some types of AI:
 - discriminative AI [predictive model (trained to label something)
 - generative AI (trained to create something)

- LLM (large language models)

y=f(x) [y=output, x=input, f=function]
  - if y is a number, probability, class, it is not gen ai
  - if it is natural language, image, audio, it is gen ai

Building applications:
- Level 1 - provide prompt engineering (augment the user), with “shot” (examples) and “chain of thought” (instructions for steps to follow)
- Level 2 - provide specific context to the LLM, i.e, with RAG to give access to your own data set, documents, code, etc.
- Level 3 - fine tuning to make the model an expert in the domain

Parameter-efficient tuning methods (PETM) - base model not altered but “a small number of add-on layers are tuned which can be swapped in and out at inference time.”

opensource frameworks for building applications (langchain, etc)

Frontier models - models like co-pilot that can understand multiple type of models and coordinate between them.

Types of LLMs:
  - generic (predict next word)
  - instruction tune (predict response to instruction)
  - dialog tuned (perform dialog by predicting next response)

Chain of thought reasoning - a model is more likely to get the correct answer if it first explains the reason for the answer.



Prompt basics:
- Instruction (what we want it to do)
- Context (background information, necessary details)
- Input/question
- Output type/format

Prompt engineering techniques:
- Zero-shot prompting (no examples) vs few-shot prompting (giving a few examples)
- Prompt chaining - break down the task into sub tasks
- Chain of thought prompting - ask it to do something “step-by-step” or to articulate it’s reasoning so it will reason through the sub-tasks itself

Tips:
- Use delimiters
- Ask for structured output (html, json, markdown)
- Ask to “not make things up” and “say I do not know”
- Ask not to assume

## RAG

1. Document embedding - model chunks source documents and converts them to embeddings and stores in vector database
2. Dense vector embedding - model converts query to embeddings and performs similarity search on vector database
    1. In-context learning - inject retrieved chunks in to prompt and send to llm

Chunking strategies:
- Context-aware chunking, for example by sentence, paragraph or section. Can include metadata tags to identify what the chunk is about
- Fixed-size: a specific number of tokens
- Chunk overlap keeps some consistency between chunks
- Windowed summarisation, append a summary of the previous chunk’s content
- Summarisation: only embed a summary of sections of your articles rather than the whole article.
Try to match the semantics of the query with the semantics of chunking/indexing

Embedding models:
- Numerical representation
- Some models can handle more diverse words and others cannot
- Some models handle certain domains or topics better
- Some models have a constrain on chunk size
- Some models support different languages
- More dimensions means higher storage cost

Re-ranking - use another model to re-rank the chunks returned from the index search

MLflow - a tool for training models and saving (logging) their contexts so they can be used later and compared
- “Logging” - saving a model’s context
- “Flavor” - any config or changes you’ve made to package a model 
- “Experiment” - a collection of runs against a model with parameters and evaluation scores for each, from which you can infer the best one to choose.

RAG evaluation metrics.
- Three things we can inspect: the query, the context (provided by RAG) and the response from the model. We can also use an expected answer, if applicable, to compare the result.
- Q: is the context related to the query? (Do we have the right data in our index?)
- Q: is the response supported by the context? (Did we get the right data out of our index?)
- Q: is the answer relevant and accurate? (Did we get the prompting right? Is context too big?)
- Use “LLM-as-judge” to compare question/answers against a large curated dataset

## Other

DSPy - describe your behaviour as code, not strings (prompts)

ReAct - Reason + Act

Multi-modal ai - beyond just text (voice, images, video) [both retrieval and generator]

Multi-agent collaboration - agents that talk to each other. Agents focus on specific tasks (specialisation)

### Protection:
- Prompt safety / guardrail “Do not teach people how to commit crimes”, “Only answer questions about X”
- Guardrail safety filter - use another model to validate the response
- DASF (Data and AI Security Framework), 12 AI system components and 55 associated risks. Of these 6 are most relevant to AI engineers:
    - Catalog - controlling data assets
    - Algorithm - known risks for the specific models you are using
    - Evaluation - how to evaluate and detect problems
    - Model management - storage, deployment, access control
    - Operations - built-in process for validation, testing, monitoring
    - Platform - the system the AI is running on needs to be secure

### Evaluations

- Loss - originally LLMs were rated on whether they could find the next word in the sentence, and how confident it was right. This produces a model that can guess a grammatically correct word, but not a coherent sentence.
- Perplexity - rating words based on how likely they will fit into a sentence. Low perplexity = high confidence. Now the model can produce correct sentences, but they won’t match the context of a conversation.
- Toxicity - rating the harmfulness of a response
- MLflow provide evaluators (regression, classification, question-answering, text-summarization, …)
- Task specific evaluation metrics:
    - Translation ‘BLEU’ (BiLingual Evaluation Understudy)
    - Summarisation ‘ROUGE’ (Recall Oriented Understudy for Gisting Evaluation)
    - Important: “uni-gram” matching single words (i.e., how many words in the response match the expected response), “bi-gram” matching two words, “tri-gram” matching three words, “n-gram”, matching multiple words
    - Benchmarking - tested against specific data sets (and types of data sets). You should evaluate your llm task on your own data too.
    - If we don’t have a reference data set the next best thing we can use is LLM-as-a-judge
        - This needs some human-provided examples (few-shot)
        - A rubric or specific evaluation scale

### Deployments

Types:
- Batch (generate predictions ahead of time)
- Streaming (micro batches)
- Real-time

ai_query - a way of running a batch jobs against a databricks model using a sql method (named ai_query), so that the response is returned and can be used as part of a query and integrated into a data workflow.

Model serving allows a/b testing or canary deployments by serving multiple model configurations to the same endpoint and letting you compare the results between them.

### Monitoring (Databricks specific)

Unpacking the inference table into a “processed payloads/inference table” - can schedule as a batch job
Lakehouse monitoring will run over the processed table and produce a metrics table

### Databricks specifically:

- Hosts llm models and allows you to call out to others
- DBRX Base (pre-trained) and DBRX Instruct (fine-tuned) are two models provided by Databricks, with DBRX Instruct specifically developed to deal with language understanding, programming and math (planning and task exection)
- Vector Search - RAG implementation
- Lakehouse: a data warehouse for raw, diverse data with “structure, reliability and performance” build on top
- Lakehouse monitoring
- Mosaic AI
- Llama Guard - model for filtering prompts or model output (meta open source model)
- Unity catalog (UC) - catalog of models on Lakehouse
    - Model name
    - Model version
    - Model @alis - development, production, etc
    - Tags?
    - Inference table - a table that contains a log of request/response generated from a live model (when payload logging is enabled)
