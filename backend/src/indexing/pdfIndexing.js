import 'dotenv/config';
import path from 'path';

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function pdfIndexing(){
const pdfFilePath = path.join(process.cwd(), 'src', 'uploads', 'pdfName.pdf'); 

const loader = new PDFLoader(pdfFilePath);

const docs = await loader.load();

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

const vectorStore = await QdrantVectorStore.fromDocuments(
    docs,embeddings,{
        url:'http://localhost:6333',
        collectionName:"doc-chat"
    })

    console.log("Indexing of documents done...");
    

}

export default pdfIndexing