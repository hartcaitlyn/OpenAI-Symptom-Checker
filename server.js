import express from "express"; //framework for creating the server
import path from "path"; //file and directory paths
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";
import conditionLibrary from "./conditions.js";

dotenv.config();

const app = express();
app.use(express.json());

// Serve frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint for symptom checking
app.post("/check-symptoms", async (req, res) => {
  const { symptoms } = req.body;

  try {
    // Get AI response
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: symptoms }],
      model: "gpt-3.5-turbo"
    });
    const llmResponse = chatCompletion.choices[0].message.content;

    // Match against internal condition library
    const inputSymptoms = symptoms.toLowerCase().split(/,|\band\b|\s+/).map(s => s.trim()).filter(Boolean);

    const match = conditionLibrary.find(entry =>
      entry.symptoms.every(symptom =>
        inputSymptoms.includes(symptom.toLowerCase())
      )
    );

    res.json({
      llmResponse,
      internalMatch: match || null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
//start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
