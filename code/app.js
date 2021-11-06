var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produtosRouter = require('./routes/produtosRoutes');
var tipoprodutos = require('./routes/TipoProdutosRoutes');
var eventsRouter = require('./routes/eventsRoutes');
var tipoeventos = require('./routes/TipoEventosRoutes');
var distritoRouter = require('./routes/DistritoRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/produtos',produtosRouter);
app.use('/api/tipoprodutos', tipoprodutos);
app.use('/api/eventos',eventsRouter);
app.use('/api/tipoeventos', tipoeventos);
app.use('/api/distritos',distritoRouter);

module.exports = app;
