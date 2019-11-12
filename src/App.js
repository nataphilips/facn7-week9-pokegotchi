import React from "react";
import { getPokemon } from "./utils";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";

function App({ name }) {
  const [data, setData] = React.useState(null);
  const [pokename, setPokeName] = React.useState("");
  const [playCounter, setPlayCounter] = React.useState(0);
  const [pooped, setPooped] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  // React.useEffect(() => {
  // name = pokename;
  // getPokemon(pokename).then(data => {
  //   setData(data);
  //   console.log(data);
  // });
  // }, [pokename]);
  // if (!data) return <div>Loading...</div>;
  // console.log(data);

  const handlePlay = () => {
    setPlayCounter(playCounter + 1);
    if (playCounter > 3) {
      setPlayCounter(0);
      setPooped(true);
    }
  };
  const handleSearch = event => {
    event.preventDefault();
    getPokemon(pokename).then(data => {
      setData(data);
    });
  };

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
        <button onClick={handleSearch}>Search</button>
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
              {pooped && (
                <div id="poopContainer">
                  <FontAwesomeIcon icon={faPoo} id="poop" />
                </div>
              )}
            </div>
          </div>
          <div>
            <button onClick={handlePlay} disabled={pooped}>
              Play
            </button>
            <button disabled={!pooped}>Clean</button>
          </div>
          <div>{playCounter}</div>
        </div>
      )}
    </div>
  );
}

export default App;
