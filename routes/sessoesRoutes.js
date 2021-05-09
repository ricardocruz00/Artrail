var express = require('express');
var router = express.Router();
var sessionModel = require("../models/sessoesModel");

/* GET all sessões */
router.get('/:id', async function(req, res, next) {
  let idArte = req.params.id;  
  let result = await sessionModel.getSessoes(idArte);
    res.status(result.status).
       send(result.data);
});

/* GET one sessão */

// /api/sessoes/info/2
router.get('/info/:id', async function(req, res, next) {
  let idSessao = req.params.id;  
  let result = await sessionModel.getOne(idSessao);
    res.status(result.status).
       send(result.data);
});

module.exports = router