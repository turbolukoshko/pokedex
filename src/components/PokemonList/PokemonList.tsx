import React, { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { isLastPage } from "../../services/helper";
import { getFavouritePokemonListFromLocalStorage } from "../../services/localStorageHelper";
import { getFavouritePokemonRegister } from "../../store/favouritePokemon/favouritePokemonAction";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import { PokemonSelectorState } from "../../store/types";
import { Accordion } from "../Accordion/Accordion";
import { Loader } from "../Loader/Loader";
import { Pagination } from "../Pagination/Pagination";
import { PokemonTile } from "../PokemonTile";
import "./PokemonList.scss";
import { Snackbar } from "../shared/Snackbar/Snackbar";

type PaginationData = {
  limit: number;
  offset: number;
};

export type SnackbarType = {
  text: string;
  variant: string;
  activeState: boolean;
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
  const { data, count, loading } = pokemon;

  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("page") || "1";

  const [queryParamPage, setQueryParamPage] = useState<string>(param);
  const [selectValue, setSelectValue] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<any>(data);
  const [activeSnackbar, setActiveSnackbar] = useState<SnackbarType[]>([]);

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

  useEffect(() => {
    const dataFromLocalStorage = getFavouritePokemonListFromLocalStorage;
    dispatch(getFavouritePokemonRegister(dataFromLocalStorage));
  }, [dispatch]);

  const pokemonListClone = _.cloneDeep(data);

  const filterPokemon = useCallback(() => {
    if (selectValue === "all") {
      return pokemonListClone;
    }
    const filteredPokemonList0 =
      pokemonListClone &&
      pokemonListClone.filter(
        (pokemon: any) => pokemon.types[0].type.name === selectValue
      );

    const filteredPokemonList1 =
      pokemonListClone &&
      pokemonListClone.filter(
        (pokemon: any) =>
          pokemon.types[1] && pokemon.types[1].type.name === selectValue
      );

    return [...filteredPokemonList0, ...filteredPokemonList1];
  }, [setFilteredData, selectValue, data]);

  useEffect(() => {
    const filteredPokemonList = filterPokemon();

    setFilteredData(filteredPokemonList);
  }, [setFilteredData, selectValue, setSelectValue, data, filterPokemon]);

  const sortPokemon = (sortParam: string) => {
    const deepClonePokemonFilteredData = _.cloneDeep(filteredData);
    if (sortParam === "asc") {
      const sortedPokemon = deepClonePokemonFilteredData.sort(
        (a: any, b: any) => a.id - b.id
      );
      setFilteredData(sortedPokemon);
    }

    if (sortParam === "desc") {
      const sortedPokemon = deepClonePokemonFilteredData.sort(
        (a: any, b: any) => b.id - a.id
      );
      setFilteredData(sortedPokemon);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Accordion
            count={count}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            pokemon={pokemon.data}
            sortPokemon={sortPokemon}
          />
          <main className="pokemon__main container">
            <ul className="pokemon__list">
              {filteredData.map((pokemon: any) => {
                return (
                  <PokemonTile
                    pokemon={pokemon}
                    key={pokemon.id}
                    onClick={history}
                    setActiveSnackbar={setActiveSnackbar}
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
          {activeSnackbar[0]?.activeState && (
            <Snackbar
              text={activeSnackbar[0].text}
              variant={activeSnackbar[0].variant}
              activeSnackbar={setActiveSnackbar}
            />
          )}
        </>
      )}
    </div>
  );
};
