var express = require('express');
var router = express.Router();
var sessionModel = require("../models/sessaoModel");

router.get('/:id', async function(req, res, next) {
    let idSessao = req.params.id;  
    let result = await sessionModel.getFotos(idSessao);
      res.status(result.status).
         send(result.data);
  });

module.exports = router;