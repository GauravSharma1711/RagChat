import 'dotenv/config';
import { OpenAI } from 'openai';
import { getText } from "../utils/textService.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

 const textfun = async (question) => {
  try {
    const text = getText(); // get the latest stored text

    const SYSTEM_PROMPT = `You are an AI agent that answers based on context:
    Context: ${text}`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("Error in textfun:", error.message);
    return "Error: Unable to get response";
  }
};

export default textfun
