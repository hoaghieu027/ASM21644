var express = require('express');
var router = express.Router();
const GundamModel = require('../models/GundamModel');


//const ToystoreModel = require('../models/toystoreModel');

//URL : localhost:3001/toystore
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM student
   var gundams = await GundamModel.find();
   //res.send(students);
   // render ra file view : views/student/index.hbs và gửi kèm data thông qua biến 'students'
   res.render('gundam/index', { gundams: gundams });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM student WHERE id = 'id'
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

// router.get('/nameasc', async (req, res) => {
//    //1: ascending,  -1: descending
//    var gundams = await gundammodel.find().sort({ name: 1 });
//    res.render('gundam/index', { gundams: gundams });
// })

// router.get('/namedesc', async (req, res) => {
//    var gundams = await gundammodel.find().sort({ name: -1 });
//    res.render('gundam/index', { gundams: gundams });
// })

module.exports = router;