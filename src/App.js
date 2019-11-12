import React from "react";
import { getPokemon } from "./utils";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";

function App({ name }) {
  const [data, setData] = React.useState(null);
  const [pokename, setPokeName] = React.useState("");

  // React.useEffect(() => {
  // name = pokename;
  // getPokemon(pokename).then(data => {
  //   setData(data);
  //   console.log(data);
  // });
  // }, [pokename]);
  // if (!data) return <div>Loading...</div>;
  // console.log(data);
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <form>
        <label htmlFor="pokeSearch">Pick a pokemon</label>
        <input
          type="text"
          id="pokeSearch"
          value={pokename}
          onChange={event => setPokeName(event.target.value)}
        />
        <button
          onClick={event => {
            event.preventDefault();
            getPokemon(pokename).then(data => {
              setData(data);
              console.log(data);
            });
          }}
        >
          Search
        </button>
      </form>
      {data && data.id && (
        <div>
          <h2>{data.name}</h2>
          <div id="message">Play with me</div>
          <div className="pokeHouse">
            <div id="pokemonZone">
              <img
                id="pokemon"
                src={data.sprites.front_default}
                alt={`${data.name} default sprite`}
              />
              <div id="poopContainer">
                <FontAwesomeIcon icon={faPoo} id="poop" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
