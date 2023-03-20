var express = require('express');
var router = express.Router();

const pokemonController = require ('../controllers/indexController')
const indexController = require ('../controllers/indexController')


/* GET home page. */
router.get('/', indexController.index)
router.get('/pokemon', pokemonController.searchPokemonByName)



module.exports = router;
