const express = require ('express');
const url = 'https://pokeapi.co/api/v2/pokemon/'
const indexController = {
  searchPokemonByName: async function(req, res) {
    const nombre_pokemon = req.params.nombre_pokemon;
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
    res.render('pokemons/pokemon', { pokemon });
  },

  getFourPokemon: async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemonDataList = await Promise.all(
      data.pokemon
        .filter((pokemon, index, self) => 
          index === self.findIndex((p) => (
            p.pokemon.name === pokemon.pokemon.name
          ))
        )
        .slice(0, 1)
        .map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            id: pokemonData.id,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types ? pokemonData.types.map((type) => type.type.name) : [],
            sprites: pokemonData.sprites,
          };
        })
    );
    return pokemonDataList;
  },
  

index : async (req, res) => {
  const pokemonTypes = [
    { type: 'fire', pokemon: await indexController.getFourPokemon('fire') },
    { type: 'flying', pokemon: await indexController.getFourPokemon('flying') },
    { type: 'water', pokemon: await indexController.getFourPokemon('water') },
    { type: 'bug', pokemon: await indexController.getFourPokemon('bug') },
    { type: 'dark', pokemon: await indexController.getFourPokemon('dark') },
    { type: 'dragon', pokemon: await indexController.getFourPokemon('dragon') },
    { type: 'ground', pokemon: await indexController.getFourPokemon('ground') },
    { type: 'fairy', pokemon: await indexController.getFourPokemon('fairy') },
    { type: 'ghost', pokemon: await indexController.getFourPokemon('ghost') },
    { type: 'grass', pokemon: await indexController.getFourPokemon('grass') },
    { type: 'ice', pokemon: await indexController.getFourPokemon('ice') },
    { type: 'normal', pokemon: await indexController.getFourPokemon('normal') },
    { type: 'poison', pokemon: await indexController.getFourPokemon('poison') },
    { type: 'rock', pokemon: await indexController.getFourPokemon('rock') },
    { type: 'steel', pokemon: await indexController.getFourPokemon('steel') },
    { type: 'electric', pokemon: await indexController.getFourPokemon('electric') }
    
  ]; 
  
  
  
  
  res.render('index', { pokemonTypes});
}
}
module.exports = indexController;