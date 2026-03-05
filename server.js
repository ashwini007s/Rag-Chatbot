const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const router = require('./src/routes/upload');
const {initCollection} = require('./src/services/vector')
const chatRoute = require('./src/routes/chats')

const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;


app.use('/upload', router);
app.use('/chat', chatRoute);

(async function(){
    await initCollection();

    app.listen(port, function(){
        console.log(`Server running on port ${port}`);
    });

})();