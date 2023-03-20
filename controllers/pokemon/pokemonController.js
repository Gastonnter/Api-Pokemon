const express = require ('express')
const url = 'https://pokeapi.co/api/v2/pokemon/'


const pokemonController = {


      searchPokemonByName: async function(req, res) {
        const nombre_pokemon = req.query.nombre_pokemon;
        const respuesta = await fetch(url+nombre_pokemon);
        if (respuesta.status === 404) {
          return res.render('pokemons/pokemon', { pokemon: null });
        }
        const data = await respuesta.json();
        const pokemon = {
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => type.type.type),
          sprites: data.sprites
        };
        res.render('pokemons/pokemon', { pokemon,type:[types] });
      },
    
}
module.exports = pokemonController;