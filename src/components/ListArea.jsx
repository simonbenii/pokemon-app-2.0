import { useEffect, useState } from "react";
import "../css/ListArea.css";

import canalaveCity from "./../assets/img/HGSS_Seafoam_Islands-Day.png";
import eternaCity from "./../assets/img/HGSS_Viridian_Forest-Day.png";
import pastoriaCity from "./../assets/img/HGSS_Victory_Road-Day.png";
import sunyshoreCity from "./../assets/img/HGSS_Ruins_of_Alph-Day.png";
import sinnohPokemonLeague from "./../assets/img/HGSS_National_Park-Day.png";
import oreburghMine from "./../assets/img/HGSS_Mt._Mortar-Day.png";
import valleyWindworks from "./../assets/img/HGSS_Cerulean_Cave-Night.png";
import eternaForest from "./../assets/img/HGSS_Ilex_Forest-Day.png";
import fuegoIronworks from "./../assets/img/HGSS_Bell_Tower-Day.png";
import mtCoronet from "./../assets/img/HGSS_Mt._Silver-Day.png";
import greatMarsh from "./../assets/img/HGSS_Slowpoke_Well-Day.png";
import solaceonRuins from "./../assets/img/HGSS_Ruins_of_Alph-Day.png";
import sinnohVictoryRoad from "./../assets/img/HGSS_Victory_Road-Day.png";
import ravagedPath from "./../assets/img/HGSS_Dark_Cave-Route_31-Day.png";
import orehurghGate from "./../assets/img/HGSS_Union_Cave-Day.png";
import starkMountain from "./../assets/img/HGSS_Mt._Silver-Day.png";
import springPath from "./../assets/img/HGSS_Sprout_Tower-Day.png";
import turnbackCave from "./../assets/img/HGSS_Rock_Tunnel-Day.png";
import snowpointTemple from "./../assets/img/HGSS_Ice_Cave-Day.png";
import waywardCave from "./../assets/img/HGSS_Dark_Cave-Route_45-Day.png";

const locationImages = {
  "canalave-city": canalaveCity,
  "eterna-city": eternaCity,
  "pastoria-city": pastoriaCity,
  "sunyshore-city": sunyshoreCity,
  "sinnoh-pokemon-league": sinnohPokemonLeague,
  "oreburgh-mine": oreburghMine,
  "valley-windworks": valleyWindworks,
  "eterna-forest": eternaForest,
  "fuego-ironworks": fuegoIronworks,
  "mt-coronet": mtCoronet,
  "great-marsh": greatMarsh,
  "solaceon-ruins": solaceonRuins,
  "sinnoh-victory-road": sinnohVictoryRoad,
  "ravaged-path": ravagedPath,
  "oreburgh-gate": orehurghGate,
  "stark-mountain": starkMountain,
  "spring-path": springPath,
  "turnback-cave": turnbackCave,
  "snowpoint-temple": snowpointTemple,
  "wayward-cave": waywardCave,
};

function ListArea(prop) {
  const clickEvent = prop.clickEvent;

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawLocations = await fetch("https://pokeapi.co/api/v2/location");
      const locaitons = await rawLocations.json();
      setLocation(locaitons.results);
    };

    fetchData();
  }, []);

  if (!location) {
    return (
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
    );
  }

  return (
    <>
      <h1>Select a location</h1>
      <div className="areaBox">
        {location.map((x) => (
          <div onClick={() => clickEvent(x)} className="location-grid-item btn third" key={x.url} style={{ backgroundImage: `url(${locationImages[x.name]})` }}>
            <h2>{x.name}</h2>
          </div>
        ))}
      </div>
    </>
    
  );
}

export { ListArea };
