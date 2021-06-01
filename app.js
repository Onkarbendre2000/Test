
var express =  require('express');
var controller = require('./controllers/controller');

var app = express();
app.set('view engine','ejs');
app.use('/controllers',express.static('controllers'))
var PORT = process.env.PORT||6000
app.listen(PORT,'0.0.0.0');
controller(app);
