import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import { PokemonSelectorState } from "../../store/pokemon/types";
import { Loader } from "../Loader/Loader";
import { PokemonTile } from "../PokemonTile";
import "./PokemonList.scss";

type PaginationData = {
  limit: number;
  offset: number;
};

export const PokemonList: FC = (): JSX.Element => {
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);

  const paginationData: PaginationData = {
    limit: 20,
    offset: 0,
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const { limit, offset } = paginationData;

  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get("page") || "1";

  const [queryParamPage, setQueryParamPage] = useState<string>(param);

  useEffect(() => {
    if (queryParamPage === "0") {
      setSearchParams("page=1");
      setQueryParamPage("1");
    } else {
      setSearchParams(`page=${queryParamPage}`);
    }
  }, [queryParamPage, setSearchParams]);

  useEffect(() => {
    dispatch(getPokemonList(limit, offset + (+queryParamPage - 1) * 20));
  }, [dispatch, limit, offset, param, queryParamPage]);

  const { data, loading } = pokemon;

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

  return (
    <main className="wrapper">
      <h1>Pokemon List</h1>
      {loading ? (
        <Loader />
      ) : (
        <main className="pokemon__main">
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
          <div>
            <button onClick={() => paginate()} disabled={+queryParamPage === 1}>
              Prev
            </button>
            <button onClick={() => paginate("next")}>Next</button>
          </div>
        </main>
      )}
    </main>
  );
};
