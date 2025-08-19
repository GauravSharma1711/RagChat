
export const text = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        console.log("text here:", text);

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
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        console.log("url here:", url);
        res.status(200).json({
            message: "URL received successfully",
            url
        });
    } catch (error) {
        console.error("Error in url controller:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};



export const pdf = async (req, res) => {
  try {
    console.log("File info:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    // Later: feed into RAG pipeline
    // const docs = await loader.load(req.file.path);

    res.status(200).json({
      message: "PDF uploaded successfully",
      filename: req.file.filename,
      path: req.file.path,
    });
  } catch (error) {
    console.log("Error in pdf controller:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
