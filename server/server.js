const express = require('express');
const app = express();
const Groq = require('groq-sdk');
const groq = new Groq();
let menssage = '';

app.get("/api", (req, res) => {
    res.json({"users": ["UserOne","UserTwo", "UserThree"]})
})

app.get("/helloworld", (req, res) => {
console.log("Hello world")})


app.listen(5000, () => {console.log("Server is listening at port 5000")});

app.use(express.json());

app.post("/api/sendData", async (req, res) => {
    const receivedData = req.body;
    const message = await llamaAPI(receivedData.data);
    console.log("Received data:", receivedData.data);
    res.status(200).json({ message: message, data: receivedData });
    menssage = "";
});

async function llamaAPI(data) {
  let message = '';
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": data
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    message += chunk.choices[0]?.delta?.content || '';
  }
  return message
}
