import 'dotenv/config'
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import {OpenAI}  from 'openai'

const client = new OpenAI();

async function webChat(question) {
  const userQuery = question;

  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-large" });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://localhost:6333',
    collectionName:"web-data"
  });

  const vectorSearcher = vectorStore.asRetriever({ k: 3 });
  const relevantChunks = await vectorSearcher.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are an AI assistant who helps resolve user queries
  based on context from PDFs, text, or websites.

  Context:
  ${JSON.stringify(relevantChunks)}
 
  `;

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery }
    ]
  });

  return response.choices[0].message.content;
}

export default webChat
