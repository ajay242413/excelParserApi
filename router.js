const express =     require('express'),
    queries =       require('./queries'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path');

upload = multer();

router.get('/',function(req,res) {
    res.sendFile(path.dirname(__dirname)
        + "/restapi/index.html")
})

path.resolve('..', __dirname)


router.get('/readData', queries.readData)

router.post('/uploadData', upload.single('file'), queries.uploadData);

module.exports = router;
