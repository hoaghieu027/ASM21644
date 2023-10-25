var express = require('express');
var GundamModel = require('../models/GundamModel');
var PokemonModel = require('../models/PokemonModel');
//const UserModel = require('../models/UserModel');
var router = express.Router();

router.get('/', async(reg, res) => {
  var gundams = await GundamModel.find();
  var pokemons = await PokemonModel.find();
  console.log(pokemons);
  res.render('client/index', { gundams: gundams, pokemons: pokemons,});
})

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  // SELECT * FROM student WHERE id = 'id'
  var toystore = await ToystoreModel.findById(id);
  res.render('toystore/detail', { toystore: toystore });
})

module.exports = router;

