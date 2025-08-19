import 'dotenv/config';

import { CheerioWebBaseLoader } from 
"@langchain/community/document_loaders/web/cheerio";

import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


async function init(){

    const loader = new CheerioWebBaseLoader("https://js.langchain.com/");
      const docs = await loader.load();

        const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,  // tokens/characters per chunk
    chunkOverlap: 500 // overlap to keep context
     });

 const splitDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small"
});

const vectorStore = await QdrantVectorStore.fromDocuments(
    splitDocs,embeddings,{
        url:'http://localhost:6333',
        collectionName:"web-data"
    })

    console.log(" web Indexing of documents done...");
    

}

init()