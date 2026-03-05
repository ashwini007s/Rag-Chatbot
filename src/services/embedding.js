const axios = require("axios");

async function createEmbedding(text){
      try {
const response = await axios.post(
    "http://localhost:11434/api/embeddings",
    {
    model: "nomic-embed-text",
    prompt:text
})

return response.data.embedding;
      }
      catch(error){
      console.error("Embedding Error:", error.response?.data || error.message);
     throw new Error(error.message)
      }
}

module.exports = createEmbedding;