// // index.js

// var express = require('express');
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// var app = express();

// // DB setting
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(process.env.MONGO_DB);
// var db = mongoose.connection;
// db.once('open', function () {
//     console.log('DB connected');
// });
// db.on('error', function (err) {
//     console.log('DB ERROR : ', err);
// });

// // Other settings
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

// // Routes
// app.use('/', require('./routes/home'));
// app.use('/posts', require('./routes/posts'));
// app.use('/users', require('./routes/users')); // 1

// // Port setting
// var port = 3000;
// app.listen(port, function () {
//     console.log('server on! http://localhost:' + port);
// });

const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes/movie');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/movie'));
app.use(express.static(__dirname + '/public'))
app.use('/movie', require('./routes/movie'));
// 에러 처리 부분
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});