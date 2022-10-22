import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { modifyPokemonName } from "../../services/helper";

import { PokemonSortParams } from "../../types/global";
import { ArrowDown } from "../shared/ArrowDown/ArrowDown";
import { ArrowUp } from "../shared/ArrowUp/ArrowUp";
import "./Accordion.scss";

interface IAccordion {
  count: number;
  selectValue: string;
  setSelectValue: (value: string) => void;
  pokemon: any;
  sortPokemon: (value: string) => void;
}

export const Accordion: FC<IAccordion> = ({
  count,
  selectValue,
  setSelectValue,
  pokemon,
  sortPokemon,
}): JSX.Element => {
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<string>("asc");

  const history = useNavigate();

  const filterPokemonHandle = (value: string) => {
    setActiveSort("asc");
    setSelectValue(value);
  };

  const sortPokemonHandle = (value: string) => {
    sortPokemon(value);
    setActiveSort(value);
  };

  const switchAccordion = () => {
    if (activeAccordion) {
      setActiveAccordion(false);
    } else {
      setActiveAccordion(true);
    }
  };

  // get pokemon types for checkbox list
  const pokemonTypes = pokemon
    .map((pokemon: any) =>
      pokemon.types.map((pokemonType: any) => pokemonType.type.name)
    )
    .flatMap((data: any) => data);

  // unique pokemon types on page
  const uniquePokemonTypes = Array.from(new Set(pokemonTypes));

  const countPokemonTypes = () => {
    let totalCountTypes: any = {};

    pokemonTypes.forEach((name: any) => {
      if (uniquePokemonTypes.includes(name)) {
        if (!totalCountTypes.hasOwnProperty(name)) {
          totalCountTypes[name] = {};
          totalCountTypes[name].name = name;
          totalCountTypes[name].count = 1;
        } else {
          totalCountTypes[name].count = totalCountTypes[name].count + 1;
        }
      }
    });

    // Returning an array for convenient data mapping
    return totalCountTypes;
  };

  const randomPokemon = () => {
    const path =
      Math.ceil((Math.random() * count) / 2) !== 0
        ? Math.ceil((Math.random() * count) / 2)
        : Math.ceil((Math.random() * count) / 2) + 1;
    history(`/pokemon/${path}`);
  };

  return (
    <aside className="sidebar">
      <div onClick={switchAccordion} className="sidebar__accordion">
        <p>Additional sorting</p>
        {activeAccordion ? <ArrowUp /> : <ArrowDown />}
      </div>
      {activeAccordion && (
        <div className="sidebar__accordion-inner">
          <select
            className="select"
            defaultValue={selectValue}
            onChange={(e) => filterPokemonHandle(e.target.value)}
          >
            <option value="all">All types</option>
            {Object.keys(countPokemonTypes()).map((objectKey) => (
              <option
                className="sidebar__element"
                value={objectKey}
                key={countPokemonTypes()[objectKey].name}
              >
                {modifyPokemonName(countPokemonTypes()[objectKey].name)} -{" "}
                {countPokemonTypes()[objectKey].count}
              </option>
            ))}
          </select>
          <div
            className={`sort__asc ${
              activeSort === PokemonSortParams.asc ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => sortPokemonHandle("asc")}
              className="sort__asc-btn"
              disabled={activeSort === PokemonSortParams.asc}
            >
              <ArrowUp />
            </button>
          </div>
          <div
            className={`sort__desc ${
              activeSort === PokemonSortParams.desc ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => sortPokemonHandle("desc")}
              className="sort__desc-btn"
              disabled={activeSort === PokemonSortParams.desc}
            >
              <ArrowDown />
            </button>
          </div>
          <div>
            <button onClick={() => randomPokemon()} className="random-pokemon">
              Random pokemon
            </button>
          </div>

          <div>
            <button
              onClick={() => history("/favourite-pokemon")}
              className="random-pokemon"
            >
              Favourite pokemon
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
