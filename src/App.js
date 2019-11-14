import React from "react";
import { getPokemon } from "./utils";
import pokeball from "./pokeball.png";
import "./App.css";
import PokeHouse from "./PokeHouse";

function App({ name, playCounter, setPlayCounter, setFoodCounter, setPooped }) {
  const [data, setData] = React.useState(() =>
    JSON.parse(localStorage.getItem("data"))
  );
  const [pokename, setPokeName] = React.useState(() =>
    localStorage.getItem("pokename")
  );

  React.useEffect(() => {
    localStorage.setItem("pokename", pokename);
    localStorage.setItem("data", JSON.stringify(data));
  }, [data, pokename]);

  const handleSearch = event => {
    event.preventDefault();
    getPokemon(pokename).then(data => {
      setData(data);
      setFoodCounter(4);
      setPlayCounter(0);
      setPooped(false);
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={pokeball} className="App-logo" alt="logo" />
      </div>
      <form>
        <label htmlFor="pokeSearch">Pick a pokemon</label>
        <input
          name="pokemons"
          type="text"
          id="pokeSearch"
          value={pokename}
          onChange={event => setPokeName(event.target.value)}
        />
        <button id="callPoke" onClick={handleSearch} data-testid="search">
          <img id="callpoke" alt="pokeball" src={pokeball} />
        </button>
      </form>
      <form>
        <label htmlFor="pokeSearch">Or choose one of those</label>
        <select
          name="pokemons"
          type="text"
          id="pokeSearch"
          value={pokename}
          onChange={event => setPokeName(event.target.value)}
        >
          <option value="pikachu">pikachu</option>
          <option value="mewtwo">mewtwo</option>
          <option value="persian">persian</option>
          <option value="squirtle">squirtle</option>
          <option value="meowth">meowth</option>
          <option value="charizard">charizard</option>
          <option value="eevee">eevee</option>
          <option value="psyduck">psyduck</option>
          <option value="slowpoke">slowpoke</option>
        </select>
        <button id="callPoke" onClick={handleSearch} data-testid="search">
          <img id="callpoke" alt="pokeball" src={pokeball} />
        </button>
      </form>
      {data && data.id && <PokeHouse data={data} pokename={pokename} />}
    </div>
  );
}

export default App;
