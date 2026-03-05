const express = require('express');
const multer = require('multer');
const uploadPDF = require('../controller/uploadPDF')

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage})


router.post('/', upload.single('file'), uploadPDF )

module.exports = router;
