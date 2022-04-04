const express =     require('express'),
    queries =       require('./queries'),
    router = express.Router(),
    multer = require('multer');

upload = multer();


router.get('/readData', queries.readData)

router.post('/uploadData', upload.single('file'), queries.uploadData);

module.exports = router;
