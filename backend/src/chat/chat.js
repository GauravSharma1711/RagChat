import 'dotenv/config'
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import {OpenAI}  from 'openai'

const client = new OpenAI();

async function chat(){
    const userQuery = 'how to set up playwright web based loader'

    const embeddings = new OpenAIEmbeddings({
     model: "text-embedding-3-small"   
     });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,{
        url:'http://localhost:6333',
        collectionName:"web-data"
    });

  const vectorSearcher =   vectorStore.asRetriever({
        k:3
    })

  const relevantChunks = await vectorSearcher.invoke(userQuery)

  const SYSTEM_PROMPT = `
  You are an AI assistant who help in resolving user query based
  on the context available to you from a website with
  the content and page number

  Only answer based on the available context from file only.

  Important - if context is not present you only give the relevent details present according to the question asked

  Context :
   ${JSON.stringify(relevantChunks)}


  `

const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages:[

            {role:"system",content:SYSTEM_PROMPT},
            {role:"user",content:userQuery}
        ]
    })
    console.log(`🤖-${response.choices[0].message.content}`);
}
chat()


