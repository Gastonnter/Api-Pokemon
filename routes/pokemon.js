var express = require('express');
var router = express.Router();
const pokemonController =require('../controllers/pokemonController')

/*Ruta para buscar por nombre el Pokemon */ 
router.get('/', pokemonController.searchPokemonByName);

module.exports = router