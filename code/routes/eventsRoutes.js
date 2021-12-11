var express = require('express');
var router = express.Router();
var eProd = require("../models/eventosModel");
router.get("/", async function (req, res, next) {
    let events = await eProd.getAllEventos();
    res.status(events.status).send(events.result);
});


router.get('/filter/', async function(req, res, next) {
    let eventId = req.query.eventId;
    let result = await eProd.getEventosFilteredBy(eventId);
    res.status(result.status).send(result.result);
});


router.post("/", async function (req, res, next) {
    let event = req.body;
    console.log(event);
    let result = await eProd.SaveEvent(event);
    res.send(result);
});


router.post("/adduserevent", async function (req, res, next) {
    let adduserevent = req.body;
    console.log(adduserevent);
    let result = await eProd.AddUserEvent(adduserevent);
    res.status(result.status).send(result.result);
});


router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending event with id "+id);
    let result = await eProd.getEventById(id);
    res.status(result.status).send(result.result);
  });

  router.get('/:id/count', async function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    let result = await eProd.getCountUsers(id);
    res.status(result.status).send(result.result);
  });



module.exports = router;