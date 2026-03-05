function chunkText(text, chunkSize = 50, overlap = 20){
let chunk = [];
let start = 0;

while(start<text.length){
    let end = start + chunkSize;
    chunk.push(text.slice(start, end));
    start = start+ chunkSize-overlap;
}

return chunk;
}
module.exports = chunkText