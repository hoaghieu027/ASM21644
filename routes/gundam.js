var express = require('express');
var router = express.Router();
const GundamModel = require('../models/GundamModel');
//const ToystoreModel = require('../models/toystoreModel');

router.get('/', async (req, res) => {
   // SQL : SELECT * FROM student
   var gundams = await GundamModel.find();
   res.render('gundam/index', { gundams: gundams });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var gundam = await GundamModel.findById(id);
   res.render('gundam/detail', { gundam: gundam });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await GundamModel.findByIdAndDelete(id);
   console.log('Delete succeed');
   res.redirect('/gundam');
})

router.get('/add', (req, res) => {
   res.render('gundam/add');
})

router.post('/add', async (req, res) => {
   var gundam = req.body;
   await GundamModel.create(gundam);
   console.log('Add succeed !');
   res.redirect('/gundam');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var gundam = await GundamModel.findById(id);
   res.render('gundam/edit', { gundam: gundam })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var gundam = req.body;
   await GundamModel.findByIdAndUpdate(id, gundam);
   console.log('Update succeed !');
   res.redirect('/gundam');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   //relative search
   var gundams = await GundamModel.find({ name: new RegExp(keyword, "i") });
   res.render('gundam/index', { gundams: gundams });
})

module.exports = router;