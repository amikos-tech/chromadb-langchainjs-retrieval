import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { Chroma } from "@langchain/community/vectorstores/chroma";
// Create an LLM instance
const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
});
// Create embedding function
const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    // modelName:'text-embedding-3-large',
});
// Create a prompt template
const prompt = ChatPromptTemplate.fromTemplate(`Answer the following question based only of the provided context:
    <context>{context}</context>
    Question: {input}
`);

// Create a vector store to interact with the vector store
const vectorStore = new Chroma(embeddings, {
    url: 'http://localhost:8000',
    collectionName: 'my_collection',
});
// Create a retriever
const retriever = await vectorStore.asRetriever();

// Define the document chain
const combineDocsChain = await createStuffDocumentsChain({
        llm,
        prompt,
    }
);

// Define the retrieval chain
const retrievalChain = await createRetrievalChain({
    combineDocsChain,
    retriever,
});
const response = await retrievalChain.invoke({ input: "animalia" });
console.log(response);