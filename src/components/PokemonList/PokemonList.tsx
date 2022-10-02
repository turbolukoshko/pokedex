import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { isLastPage, modifyPokemonName } from "../../services/helper";
import { filteredPokemon } from "../../store/filteredPokemon/filteredPokemonActions";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import {
  FilteredPokemonSelectorState,
  PokemonSelectorState,
} from "../../store/types";
import { Loader } from "../Loader/Loader";
import { Pagination } from "../Pagination/Pagination";
import { PokemonTile } from "../PokemonTile";
import "./PokemonList.scss";

type PaginationData = {
  limit: number;
  offset: number;
};

export const PokemonList: FC = (): JSX.Element => {
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);
  const filteredPokemonData = useSelector(
    (state: FilteredPokemonSelectorState) => state.filteredPokemon
  );

  const paginationData: PaginationData = {
    limit: 20,
    offset: 0,
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const { limit, offset } = paginationData;
  const { count, loading } = pokemon;
  const { data } = filteredPokemonData;

  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("page") || "1";

  const [queryParamPage, setQueryParamPage] = useState<string>(param);
  const [selectValue, setSelectValue] = useState<string>("all");

  useEffect(() => {
    if (queryParamPage === "0") {
      setSearchParams("page=1");
      setQueryParamPage("1");
    } else {
      setSearchParams(`page=${queryParamPage}`);
    }
  }, [queryParamPage, setSearchParams]);

  useEffect(() => {
    dispatch(getPokemonList(limit, offset + (+queryParamPage - 1) * limit));
  }, [dispatch, limit, offset, param, queryParamPage]);

  useEffect(() => {
    dispatch(filteredPokemon("all"));
  }, [pokemon, dispatch]);
  
  useEffect(() => {
    if (!isLastPage(count, +queryParamPage, limit) && count > 0) {
      <Navigate to={"/"} />;
    }
  }, [queryParamPage, count, history, limit]);
  const paginate = (next?: string) => {
    /* 
      Hook setQueryParamPage acts as a pagination. 
      Changes the query parameter on click and re-render page with new data.
    */
    next
      ? setQueryParamPage(String(+queryParamPage + 1))
      : setQueryParamPage(String(+queryParamPage - 1));

    setSearchParams(`page=${queryParamPage}`);
  };

  // get pokemon types for checkbox list
  const pokemonTypes = pokemon.data
    .map((pokemon) =>
      pokemon.types.map((pokemonType: any) => pokemonType.type.name)
    )
    .flatMap((data) => data);

  // unique pokemon types on page
  const uniquePokemonTypes = Array.from(new Set(pokemonTypes));

  const countPokemonTypes = () => {
    let totalCountTypes: any = {};

    pokemonTypes.forEach((name) => {
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

  const filterPokemonHandle = (value: string) => {
    setSelectValue(value);
    dispatch(filteredPokemon(value));
  };


  return (
    <div className="wrapper">
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="pokemon__main">
            <aside className="sidebar">
              <h3>Pokemon types</h3>
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
                    onChange={(e) => {}}
                    key={countPokemonTypes()[objectKey].name}
                  >
                    {modifyPokemonName(countPokemonTypes()[objectKey].name)} -{" "}
                    {countPokemonTypes()[objectKey].count}
                  </option>
                ))}
              </select>
            </aside>
            <ul className="pokemon__list">
              {data.map((pokemon) => {
                return (
                  <PokemonTile
                    pokemon={pokemon}
                    key={pokemon.id}
                    onClick={history}
                  />
                );
              })}
            </ul>
            <Pagination
              paginationPageId={+queryParamPage}
              prev={() => paginate()}
              next={() => paginate("next")}
            />
            {isLastPage(count, +queryParamPage - 1, limit) && count > 0 && (
              <Navigate to={"/404"} />
            )}
          </main>
        </>
      )}
    </div>
  );
};
