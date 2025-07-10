About:
------------------------
This is a simple Node.js AI Symptom Checker. It asks for symptoms via the terminal, sends them to OpenAI’s GPT model for general advice, and checks an internal symptom-condition library (conditions.js) to see if the input matches a known condition and severity.


Structure:
------------------------
/Symptom Checker

- index.js           
- conditions.js      
- .env
- package-lock.json
- package.json
- README.md  


How to use:
-------------------------
1. Install dependencies:
- npm install openai 
- npm install dotenv
 
2. Add your OpenAI API key to a .env file:
- OPENAI_API_KEY=your-key-here

3. Run the script:
- node index.js

Customize conditions:
--------------------------
conditions.js is customizable. Edit conditions.js to add more symptom combinations, conditions, and severity levels.