import { useEffect, useState } from "react";
import '../css/Fight.css'
import Pokeball from "./../assets/img/Pokeball.png"

function randomNumberGenerate(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateDamage(attack, defense) {
  return ((((2 / 5 + 2) * attack * 60) / defense / 50 + 2) * randomNumberGenerate(217, 255)) / 255;
}

function Fight({ ownPokemon, enemyPokemon, resetButton, catchPokemon }) {
  const [ownPokeStat, setOwnPokeStat] = useState(ownPokemon);
  const [enemyPokeStat, setEnemyPokeStat] = useState(enemyPokemon);
  const [battle, setBattle] = useState('enemy');
  const [ownPokeHP, setOwnPokeHP] = useState(ownPokeStat.stats[0].base_stat);
  const [enemyPokeHP, setEnemyPokeHP] = useState(enemyPokeStat.stats[0].base_stat);
  const [winner, setWinner] = useState(null);
  const [isFightStarted, setIsFightStarted] = useState(false);
  const [enemyCardAnimation, setEnemyCardAnimation] = useState('');
  const [ownCardAnimation, setOwnCardAnimation] = useState('');

  const handleAttack = () => {
    if (battle === 'enemy') {
      const attack = enemyPokeStat.stats[1].base_stat;
      const defense = ownPokeStat.stats[2].base_stat;
      const damage = Math.floor(calculateDamage(attack, defense));
      const calculateHP = ownPokeHP - damage <= 0 ? 0 : ownPokeHP - damage;
      setOwnPokeHP(calculateHP);
      setBattle('own');
      setEnemyCardAnimation('swipe');
      setTimeout(() => {
        setEnemyCardAnimation('');
      }, 500);
    } else if (battle === 'own') {
      const attack = ownPokeStat.stats[1].base_stat;
      const defense = enemyPokeStat.stats[2].base_stat;
      const damage = Math.floor(calculateDamage(attack, defense));
      const calculateHP = enemyPokeHP - damage <= 0 ? 0 : enemyPokeHP - damage;
      setEnemyPokeHP(calculateHP);
      setBattle('enemy');
      setOwnCardAnimation('swipe');
      setTimeout(() => {
        setOwnCardAnimation('');
      }, 500);
    }
  };

  useEffect(() => {
    let interval = 0

    const handleAutoAttack = () => {
      handleAttack();
    };

    if (isFightStarted && battle !== 'finish') {
      interval = setInterval(handleAutoAttack, 1000);
    }

    return () => clearInterval(interval);
  }, [isFightStarted, battle]);

  useEffect(() => {
    if (ownPokeHP <= 0 || enemyPokeHP <= 0) {
      setBattle('finish');
      if (enemyPokeHP > 0) {
        setWinner(enemyPokeStat);
      }
      if (ownPokeHP > 0) {
        setWinner(ownPokeStat);
        catchPokemon(enemyPokeStat.id);
      }
    }
  }, [ownPokeHP, enemyPokeHP, winner, catchPokemon, enemyPokeStat.id, ownPokeStat]);

  const handleStartFight = () => {
    setIsFightStarted(true);
  };

  return (
    <div>
      
      {winner ? (
        <div>
          <h1>{ownPokeHP > 0 ? 'You win' : 'You lose'}</h1>
          <div className="title"></div>
          <div className="winnerCard">
            <div className="pokeHP">{Math.max(ownPokeHP, enemyPokeHP)} HP left</div>
            <div className="winnerImgDiv">
              <img src={winner.sprites.other.showdown.front_default} alt={winner.name} />
            </div>
            <p>{winner.name}</p>
            <div className="winnerCardStat">
              <div className="stat">
                <p>HP</p>
                <p>{winner.stats[0].base_stat}</p>
              </div>
              <div className="stat">
                <p>ATT</p>
                <p>{winner.stats[1].base_stat}</p>
              </div>
              <div className="stat">
                <p>DEF</p>
                <p>{winner.stats[2].base_stat}</p>
              </div>
            </div>
          </div>
          <button className={ownPokeHP > 0 ? "win" : "lose"} onClick={resetButton}>
            {ownPokeHP > 0 ? (
              <>
                <img src={Pokeball} alt="Pokeball" />
                <p>Catch {enemyPokeStat.name}</p>
                <img src={enemyPokeStat.sprites.front_default} alt="defeated pokemon" className="defeatedPokemon"/>
              </>
            ) : (
              'Back to Areas'
            )}
          </button>
        </div>
      ) : (
        <>
          <div className="fightComponent"></div>
          <div className="fightDiv">
            <div className="title">
              <h1>Welcome to the Arena!</h1>
            </div>
            <div className="wrapper">
              <div className="one">
                <div className="cardTitle">Enemy Pokemon</div>
                <div className={`selectCard enemy ${enemyCardAnimation}`}>
                  <div className="pockemonHp">{enemyPokeHP} / {enemyPokemon.stats[0].base_stat}</div>
                  <div className="selectImgDiv">
                    <img src={enemyPokemon.sprites.other.showdown.front_default} alt={enemyPokemon.name} />
                  </div>
                  <p>{enemyPokemon.name}</p>
                  <div className="fightcardStat">
                    <div className="stat">
                      <div>HP</div>
                      <div>{enemyPokemon.stats[0].base_stat}</div>
                    </div>
                    <div className="stat">
                      <div>ATT</div>
                      <div>{enemyPokemon.stats[1].base_stat}</div>
                    </div>
                    <div className="stat">
                      <div>DEF</div>
                      <div>{enemyPokemon.stats[2].base_stat}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="two">
                <div className="cardTitle">Your Pokemon</div>
                <div className={`selectCard own ${ownCardAnimation}`}>
                  <div className="pockemonHp">{ownPokeHP} / {ownPokemon.stats[0].base_stat}</div>
                  <div className="selectImgDiv">
                    <img src={ownPokemon.sprites.other.showdown.front_default} alt={ownPokemon.name} />
                  </div>
                  <p>{ownPokemon.name}</p>
                  <div className="fightcardStat">
                    <div className="stat">
                      <div>HP</div>
                      <div>{ownPokemon.stats[0].base_stat}</div>
                    </div>
                    <div className="stat">
                      <div>ATT</div>
                      <div>{ownPokemon.stats[1].base_stat}</div>
                    </div>
                    <div className="stat">
                      <div>DEF</div>
                      <div>{ownPokemon.stats[2].base_stat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="control">
              <button onClick={resetButton} disabled={isFightStarted}>Choose another Area</button>
              <button className="startFight" disabled={isFightStarted} onClick={handleStartFight}>
                Start Fight
              </button>
            </div>
          </div>
        </>
      )}
    </div>
    
  );
}

export { Fight };
