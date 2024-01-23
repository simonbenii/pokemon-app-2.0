import { useEffect, useState } from "react";

function ListOwnPokemons({ selecta, selected, usersPokemon }) {
  const [Pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getUserPokemon = async () => {
      let result = [];

      const storedUserPokemon = localStorage.getItem('userPokemon');
      const localStorageUserPokemon = storedUserPokemon ? JSON.parse(storedUserPokemon) : [];

      const allUserPokemon = [...new Set([...usersPokemon, ...localStorageUserPokemon])];

      await Promise.all(
        allUserPokemon.map(async (pokemon) => {
          const rawData = await fetch(pokemon);
          const data = await rawData.json();
          result.push(data);
        })
      );

      setPokemons(result);
    };

    getUserPokemon();
  }, [usersPokemon]);

  if (Pokemons.length === 0) {
    return (
      <div className="left-parent">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>You</h2>
      <div className="right-parent">
        {selected ? (
          <div className="selectedCard" key={selected.id}>
            <div className="selectedImgDiv">
              <img src={selected.sprites.other.showdown.front_default} />
            </div>
            <p>{selected.name}</p>
            <div className="selectedcardStat">
              <div className="stat">
                <div>HP</div>
                <div>{selected.stats[0].base_stat}</div>
              </div>
              <div className="stat">
                <div>ATT</div>
                <div>{selected.stats[1].base_stat}</div>
              </div>
              <div className="stat">
                <div>DEF</div>
                <div>{selected.stats[2].base_stat}</div>
              </div>
            </div>
          </div>
        ) : (
          Pokemons.map((pokemon) => (
            <div className="newCard" key={pokemon.id}>
              <div className="imgDiv">
                <img src={pokemon.sprites.other.showdown.front_default} />
              </div>
              <p>{pokemon.name}</p>

              <div className="cardStat">
                <div className="stat">HP {pokemon.stats[0].base_stat}</div>
                <div className="stat">ATT {pokemon.stats[1].base_stat}</div>
                <div className="stat">DEF {pokemon.stats[2].base_stat}</div>
              </div>
              <button onClick={() => selecta(pokemon)}>Select</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { ListOwnPokemons };
