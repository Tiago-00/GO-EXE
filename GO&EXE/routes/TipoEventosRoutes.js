var express = require('express');
var router = express.Router();
var eModel = require("../models/TipoEventosModel");
router.get("/", async function(req, res, next) {
    let result = await eModel.getAllTypeEventos();
    res.status(result.status).send(result.result);
});

module.exports = router;