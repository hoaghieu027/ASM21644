var mongoose = require('mongoose');
var ToystoreSchema = mongoose.Schema(
   {
      name: {
         type: String,
      },
      category: {
         type: String,
      },
      origin: {
         type: String,
      },
      image: {
         type: String,
      },
      price: {
         type: String,
      },
      description: {
         type: String,
      },
   });
var ToystoreModel = mongoose.model('gundam', ToystoreSchema, 'gundam');
module.exports = ToystoreModel;