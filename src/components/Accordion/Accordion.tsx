import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifyPokemonName } from "../../services/helper";
import {
  filteredPokemon,
  sortPokemon,
} from "../../store/filteredPokemon/filteredPokemonActions";
import { PokemonSortParams } from "../../types/global";
import { ArrowDown } from "../shared/ArrowDown/ArrowDown";
import { ArrowUp } from "../shared/ArrowUp/ArrowUp";
import "./Accordion.scss";

interface IAccordion {
  count: number;
  activeSort: string;
  setActiveSort: (value: string) => void;
  selectValue: string;
  setSelectValue: (value: string) => void;
  pokemon: any;
}

export const Accordion: FC<IAccordion> = ({
  count,
  activeSort,
  setActiveSort,
  selectValue,
  setSelectValue,
  pokemon,
}): JSX.Element => {
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const filterPokemonHandle = (value: string) => {
    setSelectValue(value);
    dispatch(filteredPokemon(value));
  };

  const sortPokemonHandle = (value: string) => {
    setActiveSort(value);
    dispatch(sortPokemon(value));
  };

  const switchAccordion = () => {
    if (activeAccordion) {
      setActiveAccordion(false);
    } else {
      setActiveAccordion(true);
    }
  };

  // get pokemon types for checkbox list
  const pokemonTypes = pokemon.data
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

  let totalCountTypes = 0;

  for (let item in countPokemonTypes()) {
    totalCountTypes += countPokemonTypes()[item].count;
  }

  const randomPokemon = () => {
    const path = Math.ceil((Math.random() * count) / 2);
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
            <option value="all">All types - {totalCountTypes}</option>
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
        </div>
      )}
    </aside>
  );
};
