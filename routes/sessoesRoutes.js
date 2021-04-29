var express = require('express');
var router = express.Router();
var sessionModel = require("../models/sessoesModel");

/* GET all sessões */
router.get('/:id', async function(req, res, next) {
  let idArte = req.params.id;  
  let result = await sessionModel.getAll(idArte);
    res.status(result.status).
       send(result.data);
});


module.exports = router