const express = require('express');
const chatRoute = express.Router();
const askQuestion = require('../controller/chat')

chatRoute.post('/', askQuestion);

module.exports = chatRoute