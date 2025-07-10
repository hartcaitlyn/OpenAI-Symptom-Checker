//import OpenAI, dotenv, readline
import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";
import conditionLibrary from "./conditions.js";

//load .env file to access API key
dotenv.config();

//OpenAI instance created
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 

});
//Readline to take input in terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//ask user input
rl.question("Describe your symptoms: ", async (input) => {
  try {
    //sending input to OpenAI
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "gpt-3.5-turbo",
    });

    const llmResponse = chatCompletion.choices[0].message.content;
    console.log("\nLLM:", llmResponse);
// Parse user input into individual symptoms
    const inputSymptoms = input.toLowerCase().split(/,|\band\b|\s+/).map(s => s.trim()).filter(Boolean);

    // Match against internal library
    const match = conditionLibrary.find(entry =>
      entry.symptoms.every(symptom =>
        inputSymptoms.includes(symptom.toLowerCase())
      )
    );

    if (match) {
      console.log(`Internal Match: ${match.condition}`);
      console.log(`Severity: ${match.severity}`);
    } else {
      console.log("No exact internal match found.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
});