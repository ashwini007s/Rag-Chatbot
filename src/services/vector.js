const {ChromaClient} = require('chromadb');

const client = new ChromaClient({
    host: "localhost",
    port: 8000,
    ssl:false

});

let collection;

async function initCollection(){
collection  = await client.getOrCreateCollection({
    name: "rag_collection_new",
    embeddingFunction: null
})
}

async function addDocuments(ids, embeddings,documents){
await collection.add({
    ids,
    embeddings,
    documents
})
}

async function queryCollection(embedding, topK=3){
const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: topK
})

return results.documents[0]
}

module.exports = {
    initCollection,
    addDocuments,
    queryCollection
}

