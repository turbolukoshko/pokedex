import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { isLastPage } from "../../services/helper";
import { filteredPokemon } from "../../store/filteredPokemon/filteredPokemonActions";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import {
  FilteredPokemonSelectorState,
  PokemonSelectorState,
} from "../../store/types";
import { Accordion } from "../Accordion/Accordion";
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
  const [activeSort, setActiveSort] = useState<string>("asc");

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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Accordion
            count={count}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            pokemon={pokemon}
          />
          <main className="pokemon__main container">
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
              prev={() => {
                setSelectValue("all");
                paginate();
              }}
              next={() => {
                setSelectValue("all");
                paginate("next");
              }}
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
