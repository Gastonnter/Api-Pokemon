const express = require ('express')
const url = 'https://pokeapi.co/api/v2/pokemon/pikachu'

const indexController = {

  getFourPokemon : async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemonList = data.pokemon.slice(0, 4);
    const pokemonDataList = await Promise.all(pokemonList.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return {
        name: pokemonData.name,
        id: pokemonData.id,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types ? pokemonData.types.map((type) => type.type.name) : [],
        sprites: pokemonData.sprites
      };
    }));
    return pokemonDataList;
  },

index : async (req, res) => {
  const firePokemon = await indexController.getFourPokemon('fire');
  const airPokemon = await indexController.getFourPokemon('flying');
  const waterPokemon = await indexController.getFourPokemon('water');
  const groundPokemon = await indexController.getFourPokemon('ground');
  res.render('index', { firePokemon, airPokemon, waterPokemon, groundPokemon });
}
}
module.exports = indexController;