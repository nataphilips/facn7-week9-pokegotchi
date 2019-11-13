import React from "react";
import { getPokemon } from "./utils";
import pokeball from "./pokeball.png";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";

function App({ name }) {
  const [data, setData] = React.useState(() =>
    JSON.parse(localStorage.getItem("data"))
  );
  const [pokename, setPokeName] = React.useState(() =>
    localStorage.getItem("pokename")
  );
  const [playCounter, setPlayCounter] = React.useState(
    JSON.parse(localStorage.getItem("counter")) || 0
  );
  const [foodCounter, setFoodCounter] = React.useState(
    JSON.parse(localStorage.getItem("foodcounter")) || 4
  );
  const [pooped, setPooped] = React.useState(false);
  const [hungry, setHungry] = React.useState(false);
  const [cleaning, setCleaning] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const funmeter = ["😴", "💛", "💛💛", "💛💛💛", "💛💛💛💛"];
  const food = ["HUNGRY", "🍎", "🍎🍎", "🍎🍎🍎", "🍎🍎🍎🍎"];

  // const [lives, setLives] = React.useState(["♥", "♥♥", "♥♥♥", "♥♥♥♥", "♥♥♥♥♥"]);

  // console.log(lives);
  React.useEffect(() => {
    localStorage.setItem("pokename", pokename);
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("counter", playCounter);
    localStorage.setItem("foodcounter", foodCounter);
  }, [data, playCounter, pokename, foodCounter]);

  const handlePlay = () => {
    setPlayCounter(playCounter + 1);
    setFoodCounter(foodCounter - 1);
    if (playCounter > 3) {
      setPlayCounter(0);
      setPooped(true);
      setMsg("Whoops!");
    } else if (foodCounter === 1) {
      setHungry(true);
      setMsg("Feed me, please!");
    }
  };
  const handleSearch = event => {
    event.preventDefault();
    getPokemon(pokename).then(data => {
      setData(data);
      setFoodCounter(4);
      setPlayCounter(0);
      setPooped(false);
    });
  };
  const handlePoops = () => {
    setPooped(false);
    setMsg("Thanks!");
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
    }, 1000);
    setTimeout(() => {
      setMsg("");
    }, 2000);
    if (foodCounter === 0) {
      console.log("I'm hungry too!");
      setHungry(true);
      console.log(hungry);
    }
  };
  const handleFood = () => {
    setHungry(false);
    setFoodCounter(4);
    setMsg("Tasty!");
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={pokeball} className="App-logo" alt="logo" />
      </div>
      <form>
        <label htmlFor="pokeSearch">Pick a pokemon</label>
        <input
          type="text"
          id="pokeSearch"
          value={pokename}
          onChange={event => setPokeName(event.target.value)}
        />
        <button id="callPoke" onClick={handleSearch} data-testid="search">
          <img id="callpoke" src={pokeball} />
        </button>
      </form>
      {data && data.id && (
        <div id="gameContainer">
          <h2 id="pokeName" data-testid="pokename">
            {data.name}
          </h2>
          <div className="pokeHouse">
            {cleaning && <div id="bubbles"></div>}
            <div id="message">
              <div id="speech">{msg ? msg : "Play with me!"}</div>
            </div>
            <div id="pokemonZone">
              <img
                id="pokemon"
                src={
                  !pooped
                    ? data.sprites.front_default
                    : data.sprites.back_default
                }
                alt={`${data.name} default sprite`}
              />

              <div
                id="poopContainer"
                style={{
                  transform: pooped && "translateY(30%)",
                  transition: pooped && "all 1s ease-in",
                  visibility: !pooped ? "hidden" : "visible"
                }}
              >
                <FontAwesomeIcon icon={faPoo} id="poop" />
              </div>
            </div>
          </div>
          <div class="meters">
            <span class="stats">Fun: {funmeter[playCounter]}</span>
          </div>
          <div class="meters">
            <span class="stats">Food :{food[foodCounter]}</span>
          </div>
          <div id="btnCont">
            <button onClick={handlePlay} disabled={pooped || hungry}>
              Play
            </button>
            <button onClick={handleFood} disabled={!hungry}>
              Feed
            </button>
            <button onClick={handlePoops} disabled={!pooped}>
              Clean
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
