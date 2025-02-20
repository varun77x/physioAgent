const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;
const API_KEY = "AIzaSyCV3f6caOEdxnqWV0qjE00DAbXfVwaJvGQ";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use(express.json());
app.use(cors());

app.post("/generate", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        res.json({ text });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to generate text" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
