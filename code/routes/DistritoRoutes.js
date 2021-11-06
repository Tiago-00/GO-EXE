var express = require('express');
var router = express.Router();
var dModel = require("../models/DistritoModel");
router.get("/", async function(req, res, next) {
    let result = await dModel.getAllDistritos();
    res.status(result.status).send(result.result);
});

module.exports = router;