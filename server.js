'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  if (!req.file) {
    res.json("No file attached");
  }
  res.json({
    name: req.file['originalname'],
    type: req.file['mimetype'],
    size: req.file['size'],
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
