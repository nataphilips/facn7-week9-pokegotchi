function getPokemon(name) {
  name = name.toLowerCase();
  return window
    .fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

module.exports = { getPokemon };
