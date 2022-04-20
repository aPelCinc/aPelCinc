'use strict';

let express = require('express');
var bodyParser = require('body-parser')
let ejs = require('ejs');
let path = require('path');
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
let i = 0;
let noms = [];

app.get('/', (req, res) => {
    res.render('index', {
       contador : i,
       noms : noms
      });
      i++;
});

app.post('/form', (req, res) => {
    console.log(req.body);
    if(req.body.nom && req.body.nom != ''){
        noms.push(req.body.nom);
    }
    
    res.redirect("/");
});

app.use('/js', express.static('js'))

app.listen(PORT, HOST, function() {
    console.log(`Running on http://${HOST}:${PORT}`);
});