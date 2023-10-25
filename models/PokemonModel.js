var mongoose = require('mongoose');
var PokemonSchema = mongoose.Schema(
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
var PokemonModel = mongoose.model('pokemon', PokemonSchema, 'pokemon');
module.exports = PokemonModel;