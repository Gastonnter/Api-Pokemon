const express = require ('express');

const indexController = {

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