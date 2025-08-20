
import webIndexing from "../indexing/webindexing.js";
import pdfIndexing from "../indexing/pdfIndexing.js";
  import webChat from "../chat/webChat.js";
  import docChat from "../chat/docchat.js";
import textfun from '../chat/textChat.js'
import { setText } from "../utils/textService.js";

export const text = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
 
    
    setText(text.text); // store text for later AI usage

    res.status(200).json({
      message: "Text received successfully",
      text
    });
  } catch (error) {
    console.error("Error in text controller:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const url = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    webIndexing(url);

    await chat({ collectionName: "web-data", question: "", textData: "" });

    res.status(200).json({ message: "URL received successfully", url });

  } catch (error) {
    console.error("Error in url controller:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const pdf = async (req, res) => {
  try {
    console.log("File info:", req.file);
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

    pdfIndexing();

    await chat({ collectionName: "doc-chat", question: "", textData: "" });

    res.status(200).json({
      message: "PDF uploaded successfully",
      filename: req.file.filename,
      path: req.file.path
    });

  } catch (error) {
    console.log("Error in pdf controller:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};




export const chatController = async (req, res) => {
  try {
    const { question, type } = req.body;
    console.log("reached chat controller", question,type);
    
    if(!question){
      return res.status(404).json({error:"Chat not found"});
    }

  const answer =  type.toString() == "pdf"?
   await docChat(question) :
     ( type.toString() == "web" ? await webChat(question): await textfun(question) );





    return res.status(200).json(answer);
  } catch (error) {
    console.log("Error in AI controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};