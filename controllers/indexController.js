const express = require ('express')
const url = 'https://pokeapi.co/api/v2/pokemon/pikachu'


const indexController = {

    index: function(req, res, next) {
        res.render('index', { title: 'Express' });
      },
}
module.exports = indexController;