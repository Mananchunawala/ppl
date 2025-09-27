import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// app.post("/api/groq", async (req, res) => {
//   try {
//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${GROQ_API_KEY}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(req.body)
//     });
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Groq API call failed" });
//   }
// });

app.post("/api/groq", async (req, res) => {
  try {
    const { prompt, model = "llama-3.1-8b-instant" } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq API call failed" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
