// backend/server.js

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client (hardcoded for quick validation; use environment variables in production)
const openai = new OpenAI({
  apiKey: "sk-NK18IVaNVY9BsAys3fblXEtlRaTNb3c12BDBgOqN3dsEvLb4",
  baseURL: "https://xiaoai.plus/v1"
});

app.post('/api/explain', async (req, res) => {
  const { code, language } = req.body;
  const prompt = `
Please provide a line-by-line explanation of the following ${language} code, identify any potential logical errors and point to the place that is causing the bug:
\`\`\`${language}
${code}
\`\`\`
Return the result as JSON containing two arrays: "explanations" and "errors".
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful code review assistant. Always explain in English.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0
    });

    const text = completion.choices[0].message.content;

    try {
      const result = JSON.parse(text);
      return res.json(result);
    } catch {
      return res.json({ raw: text });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Code Wizard backend is running on port ${PORT}`);
});