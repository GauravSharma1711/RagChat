import 'dotenv/config';

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function init(){
const pdfFilePath = './resume_gaurav_sharma_1.pdf'
const loader = new PDFLoader(pdfFilePath);

const docs = await loader.load();

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small"
});

const vectorStore = await QdrantVectorStore.fromDocuments(
    docs,embeddings,{
        url:'http://localhost:6333',
        collectionName:"doc-chat"
    })

    console.log("Indexing of documents done...");
    

}

init()