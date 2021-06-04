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

module.exports = router;