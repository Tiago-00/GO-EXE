var express = require('express');
var router = express.Router();
var mProd = require("../models/produtosModel");
router.get("/", async function (req, res, next) {
    let products = await mProd.getAllProdutos();
    res.status(products.status).send(products.result);
});


router.get('/filter/', async function (req, res, next) {
    let productId = req.query.productId;
    let result = await mProd.getProductsFilteredBy(productId);
    res.status(result.status).send(result.result);
});


router.post("/", async function (req, res, next) {
    let product = req.body;
    console.log(product);
    let result = await mProd.SaveProduct(product);
    res.send(result);
});


module.exports = router;