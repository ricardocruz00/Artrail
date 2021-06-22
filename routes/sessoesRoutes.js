var express = require('express');
var router = express.Router();
var sessionModel = require("../models/sessoesModel");

/* GET sessões */
router.get('/:id', async function(req, res, next) {
  let idArte = req.params.id;  
  let result = await sessionModel.getSessoes(idArte);
    res.status(result.status).
       send(result.data);
});

/* GET sessões filtradas por estado */
router.get('/sessoesEstado/filtrado/', async function (req, res, next) {
  let sessaoEstado = req.query; 
  let result = await sessionModel.getSessoesFiltradas(sessaoEstado);
    res.status(result.status).
       send(result.data);
});

// Get all categorias
router.get('/categorias/all', async function(req, res, next) {
  let categorias = req.query;  
  let result = await sessionModel.getAllCategorias(categorias);
    res.status(result.status).
       send(result.data);
});

router.get('/categorias/arte/:id', async function(req, res, next) {
  let idArte = req.params.id;  
  let result = await sessionModel.getCategoriasArte(idArte);
    res.status(result.status).
       send(result.data);
});

// Get all estados
router.get('/estados/all', async function(req, res, next) {
  let estados = req.query;  
  let result = await sessionModel.getAllEstados(estados);
    res.status(result.status).
       send(result.data);
});

// /api/sessoes/info/2
router.get('/info/:id', async function(req, res, next) {
  let idSessao = req.params.id;  
  let result = await sessionModel.getOne(idSessao);
    res.status(result.status).
       send(result.data);
});

module.exports = router