const express = require("express");
const cors = require("cors");

const PORT = 8000

const app = express();

app.use(express.json());
app.use(cors());

// Create endpoint for completions
app.post('/completions', async (req, res) => {

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Hello !",
                    max_tokens: 100
                },
            ]
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ⚡️`);
})