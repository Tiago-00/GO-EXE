var express = require('express');
var router = express.Router();
var cModel = require("../models/TipoProdutosModel");
router.get("/", async function(req, res, next) {
    let result = await cModel.getAllTypeProducts();
    res.status(result.status).send(result.result);
});

module.exports = router;