var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


/* login */
router.get('/LoginDados/', async function (req, res, next) {
 let user = req.query;
  let result = await userModel.login(user);
  res.status(result.status).
    send(result.data);
});



/* add user */
router.post('/novoUser', async function (req, res, next) {
  let user = req.body;
  let result = await userModel.newUser(user);
  res.status(result.status).
    send(result.data);
});



/* GET favoritos */
router.get('/favoritos/:id', async function(req, res, next) {
  let idUser = req.params.id;  
  let result = await userModel.getFavorites(idUser);
    res.status(result.status).
       send(result.data);
});

/* GET Sessoes do User */
router.get('/sessoesUser/:id', async function(req, res, next) {
  let idUser = req.params.id;  
  let result = await userModel.getSessoesUser(idUser);
    res.status(result.status).
       send(result.data);
});

/* add favorito */
router.post('/addFav/sessao',async function(req,res,next) {
  let favorito = req.body;
  let result = await userModel.addFavorites(favorito);
  console.log("routes "+JSON.stringify(favorito));
  res.status(result.status).
    send(result.data);
});


/* remove favorito */
router.put('/removeFav/:favoritoID', async function(req, res, next) {
  let favoritoID = req.params.favoritoID;
  let result = await userModel.removeFavorites(favoritoID);
  res.status(result.status).send(result.data);
});


/* add report */
router.post('/report/sessao', async function (req, res, next) {
  let review = req.body;
  let result = await userModel.newReport(review);
  console.log("routes "+JSON.stringify(review));
  res.status(result.status).
    send(result.data);
});

module.exports = router;