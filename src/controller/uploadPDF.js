const extractTextfromPdf = require('../services/pdfservice')
const chunkText = require('../util/chunkText')
const createEmbedding = require('../services/embedding');
const {addDocuments} = require('../services/vector')
const {v4: uuidv4} = require('uuid');

async function uploadPDF(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        else {

            const text = await extractTextfromPdf(req.file.buffer)
            const chunks = chunkText(text);
            if (chunks.length === 0) {
                return res.status(400).json({ message: "No chunks generated" });
            }
            const id = [];
            const embeddings = [];
            const documents = [];

            for(let chunk of chunks){
                const embedding = await createEmbedding(chunk)

                id.push(uuidv4());
                embeddings.push(embedding);
                documents.push(chunk)
            }

            await addDocuments(id,embeddings,documents)

            return res.json({ message: "PDF processed successfully..", totalChunks: chunks.length })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error processing PDF" })
        console.log(err.message);
    }
}

module.exports = uploadPDF;