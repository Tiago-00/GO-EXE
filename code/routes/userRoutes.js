var express = require('express');
var router = express.Router();
var uModel = require("../models/UserModel");

router.get('/', async function (req, res, next) {
  let result = await uModel.getAllUsers();
  res.status(result.status).send(result.result);
});

router.post('/login', async function (req, res, next) {
  let nome = req.body.nome;
  let password = req.body.password;
  let result = await uModel.login(nome, password);
  res.status(result.status).send(result.result);
});

router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending user with id " + id);
  let result = await uModel.getUserById(id);
  res.status(result.status).send(result.result);
});

router.get('/:id/event', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending user with id " + id);
  let result = await uModel.getUserEventById(id);
  res.status(result.status).send(result.result);
});

router.get('/:id/product', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending user with id " + id);
  let result = await uModel.getUserProductById(id);
  res.status(result.status).send(result.result);
});

module.exports = router;