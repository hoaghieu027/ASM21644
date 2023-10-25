var express = require('express');
var GundamModel = require('../models/GundamModel');
var PokemonModel = require('../models/PokemonModel');
//const ToystoreModel = require('../models/ToystoreModel');
var router = express.Router();

//const ToystoreModel = require('../models/toystoreModsel');

//URL : localhost:3001/toystore
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM student
   //var toystores = await toystoremodel.find();
   var gundams = await GundamModel.find();
   var pokemons = await PokemonModel.find();
   //res.send(students);
   // render ra file view : views/student/index.hbs và gửi kèm data thông qua biến 'students'
   res.render('toystore/index', { gundams: gundams, pokemons: pokemons });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM student WHERE id = 'id'
   var toystore = await ToystoreModel.findById(id);
   res.render('toystore/detail', { toystore: toystore });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await ToystoreModel.findByIdAndDelete(id);
   console.log('Delete succeed');
   res.redirect('/toystore');
})

router.get('/add', (req, res) => {
   res.render('toystore/add');
})

router.post('/add', async (req, res) => {
   var category = req.body.category;
   var toystore = await GundamModel.create(toystore);
   
   if(category == "figure")
   {
      await GundamModel.create(toystore);
   }else if(category == "card"){
      await PokemonModel.create(toystore);
   }
   await ToystoreModel.create(toystore);
   console.log('Add succeed !');
   res.redirect('/toystore');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toystore = await ToystoreModel.findById(id);
   res.render('toystore/edit', { toystore: toystore })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toystore = req.body;
   await ToystoreModel.findByIdAndUpdate(id, toystore);
   console.log('Update succeed !');
   res.redirect('/toystore');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   var gundams = await GundamModel.find({ name: new RegExp(keyword, "i") });
   var pokemons = await PokemonModel.find({ name: new RegExp(keyword, "i") });
   console.log(pokemons);
   //relative search
   //var toystores = await toystoremodel.find({ name: new RegExp(keyword, "i") });
   res.render('toystore/index', { gundams: gundams, pokemons: pokemons, });
})

module.exports = router;