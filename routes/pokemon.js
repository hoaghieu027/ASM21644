var express = require('express');
var router = express.Router();
const PokemonModel = require('../models/PokemonModel');
//const ToystoreModel = require('../models/toystoreModel');

router.get('/', async (req, res) => {
   var pokemons = await PokemonModel.find();
   console.log(pokemons)
   res.render('pokemon/index', { pokemons: pokemons });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var pokemon = await PokemonModel.findById(id);
   res.render('pokemon/detail', { pokemon: pokemon });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await PokemonModel.findByIdAndDelete(id);
   console.log('Delete succeed');
   res.redirect('/pokemon');
})

router.get('/add', (req, res) => {
   res.render('pokemon/add');
})

router.post('/add', async (req, res) => {
   var pokemon = req.body;
   await PokemonModel.create(pokemon);
   console.log('Add succeed !');
   res.redirect('/pokemon');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var pokemon = await PokemonModel.findById(id);
   res.render('pokemon/edit', { pokemon: pokemon })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var pokemon = req.body;
   await PokemonModel.findByIdAndUpdate(id, pokemon);
   console.log('Update succeed !');
   res.redirect('/pokemon');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   //relative search
   var pokemons = await PokemonModel.find({ name: new RegExp(keyword, "i") });
   res.render('pokemon/index', { pokemons: pokemons });
})

module.exports = router;