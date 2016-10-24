var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs');
var portNum = 3333;

var multer = require('multer');
var upload = multer({ dest: 'data/' })

var hbs = require('express-handlebars');
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname+'/app')));
app.use(express.static(path.join(__dirname+'/data')));

//Upload
app.get('/', function (req, res) {
    res.render('upload');
});
app.post('/', upload.single('track'), function (req, res) {
    var uploadedFile = 'data/'+req.file.filename;
    console.log("Your uploaded file's path is changing from: "+uploadedFile+" to "+'data/'+req.body.title+'.mp3');
    fs.renameSync(uploadedFile,'data/'+req.body.title+'.mp3');
    var trackName = req.body.title;
    console.log("Now playing "+trackName+" in Reactor.");
    res.redirect('/'+trackName);
});


//Music Visualizer
app.get('/:track', function(req,res){
    res.render('viz');
});

app.get('*', function (req, res) {
    res.redirect('/');
});



app.listen(portNum);

console.log('Listening on port '+portNum);