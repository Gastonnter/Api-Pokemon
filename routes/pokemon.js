const express = require('express');
const router = express.Router();


const pokemonController = require ('../controllers/pokemon/pokemonController')


/* GET home page. */
router.get('/', pokemonController.searchPokemonByName);

module.exports = router;