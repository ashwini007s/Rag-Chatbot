const axios = require('axios');
const createEmbedding = require('../services/embedding');
const { queryCollection } = require('../services/vector');


async function generateAnswer(prompt) {
    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model: "llama3",
            prompt: prompt,
            stream: false
        }
    )

    return response.data.response;
};

async function askQuestion(req, res) {
    try {
        const { question } = req.body
        const questionEmbedding = await createEmbedding(question);
        const relevantChunks = await queryCollection(questionEmbedding);

        const context = relevantChunks.join('\n\n')
        const prompt = `You are answering questions about a personal document. 
        If the answer is not in the context, say "I don't know based on the document."

        Context:
        ${context}

        Question:
        ${question}

        Answer:
        `;

        const answer = await generateAnswer(prompt);
        res.json({answer});

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = askQuestion;

