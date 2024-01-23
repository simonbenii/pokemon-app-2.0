import { useState } from "react";
import { ListArea } from "./components/ListArea";
import { ListPokemons } from "./components/ListPokemons";
import { ListOwnPokemons } from "./components/ListOwnPokemons";
import { Fight } from "./components/Fight";

import "./App.css";

function App() {
  const [pageState, setPageState] = useState("listArea");
  const [area, setAreaData] = useState(null);
  const [ownPokemon, setOwnPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [userPokemon, setUserPokemon] = useState(["https://pokeapi.co/api/v2/pokemon/arceus", "https://pokeapi.co/api/v2/pokemon/charizard", "https://pokeapi.co/api/v2/pokemon/poliwhirl", "https://pokeapi.co/api/v2/pokemon/pikachu"]);

  const catchPokemon = (name) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

    if (!userPokemon.includes(pokemonUrl)) {
      setUserPokemon((prevUserPokemon) => {
        const newUserPokemon = [...prevUserPokemon, pokemonUrl];
        localStorage.setItem('userPokemon', JSON.stringify(newUserPokemon));
        return newUserPokemon;
      });
    }
  };

  const changeStateEvent = (areaData) => {
    changePageStateHook("listPokemons");
    setAreaData({
      name: areaData.name,
      url: areaData.url,
    });
  };

  const setOwnPokemons = (pokemon) => {
    setOwnPokemon(pokemon);
  };

  const setEPokemon = (pokemon) => {
    setEnemyPokemon(pokemon);
  };

  const changePageStateHook = (state) => {
    setPageState(state);
  };

  const backToAreaList = () => {
    setOwnPokemon(null);
    setEnemyPokemon(null);
    setAreaData(null);
    setPageState("listArea");
  };

  if (pageState === "listArea") {
    return (
      <div>
        <div className="selector-title">
        </div>
        <div className="App">
          <ListArea clickEvent={changeStateEvent} />
        </div>
      </div>
    );
  } else if (pageState === "listPokemons") {
    return (
      <div>
        <h1>Select a Pokemon</h1>
        <div className="selector-title">
        </div>
        <div className="row">
          <div className="column1">
            <ListPokemons url={area.url} select={setEPokemon} selected={enemyPokemon} />
          </div>
          <div className="column2">
            <p>
              <button onClick={backToAreaList}>Back to Areas</button>
            </p>
            <button disabled={enemyPokemon && ownPokemon ? false : true} onClick={() => changePageStateHook("fight")}>
              Let's go to the Arena!
            </button>
          </div>
          <div className="column3">
            <ListOwnPokemons selecta={setOwnPokemons} selected={ownPokemon} usersPokemon={userPokemon} />
          </div>
        </div>
      </div>
    );
  } else if (pageState === "fight") {
    return (
      <div>
        <Fight ownPokemon={ownPokemon} enemyPokemon={enemyPokemon} resetButton={backToAreaList} catchPokemon={catchPokemon} />
      </div>
    );
  } else {
    return <h1>Nothing</h1>;
  }
}

export default App;
