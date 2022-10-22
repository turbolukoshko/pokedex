import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { getPokemon } from "../../api";
import { PokemonTile } from "../PokemonTile";
import { transformDataFromLocalStorage } from "../../services/helper";
import { getFavouritePokemonRegister } from "../../store/favouritePokemon/favouritePokemonAction";
import { FavouritePokemonSelector } from "../../store/favouritePokemon/favouritePokemonActionTypes";
import { Loader } from "../Loader/Loader";
import { Accordion } from "../Accordion/Accordion";
import "./FavouritePokemon.scss";
import { Snackbar } from "../shared/Snackbar/Snackbar";
import { SnackbarType } from "../PokemonList";

export const FavouritePokemon: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { favouritePokemonOrder } = useSelector(
    (state: FavouritePokemonSelector) => state.favouritePokemon
  );
  const getFavouritePokemonListFromLocalStorage = localStorage.getItem(
    "favouritePokemonList"
  );

  const [favouritePokemonUrls, setFavouritePokemonUrls] = useState<string[]>(
    []
  );
  const [favouritePokemonList, setFavouritePokemonList] = useState<any>([]);
  const [localStorageData, setLocalStorageData] = useState<string | null>(
    getFavouritePokemonListFromLocalStorage
  );
  const [pokemonFilterData, setPokemonFilterData] = useState<any>([]);
  const [selectValue, setSelectValue] = useState<string>("all");
  const [activeSnackbar, setActiveSnackbar] = useState<SnackbarType[]>([]);

  useEffect(() => {
    // check if value exists in localStorage
    if (!!favouritePokemonOrder && favouritePokemonOrder?.length > 2) {
      const data = transformDataFromLocalStorage(favouritePokemonOrder);

      const listOfPokemonUrls = getFavouritePokemonUrl(data);

      setFavouritePokemonUrls(listOfPokemonUrls);
      setLocalStorageData(favouritePokemonOrder);
    } else {
      setLocalStorageData("");
      setFavouritePokemonList([]);
    }
  }, [favouritePokemonOrder]);

  useEffect(() => {
    dispatch(getFavouritePokemonRegister(localStorageData));
  }, [dispatch, localStorageData]);

  const getFavouritePokemonList = useCallback(async () => {
    setFavouritePokemonList([]);

    if (favouritePokemonUrls.length) {
      favouritePokemonUrls.map(async (favouritePokemon: any) => {
        const res = await axios.get(favouritePokemon);

        setFavouritePokemonList((prevState: any) => [...prevState, res.data]);
      });
    }
  }, [favouritePokemonUrls, setFavouritePokemonList]);

  useEffect(() => {
    getFavouritePokemonList();
  }, [favouritePokemonUrls, getFavouritePokemonList]);

  // get url from localStorage data for favourite pokemon list
  const getFavouritePokemonUrl = (pokemonList: Array<string>) =>
    pokemonList.map((pokemonId: string) => getPokemon(pokemonId));

  const pokemonListClone = _.cloneDeep(favouritePokemonList).sort(
    (pokemonPrev: any, pokemonNext: any) => pokemonPrev.id - pokemonNext.id
  );

  const filterFavouritePokemon = useCallback(() => {
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
  }, [setFavouritePokemonList, favouritePokemonList, selectValue]);

  useEffect(() => {
    const filterData = filterFavouritePokemon();

    setPokemonFilterData(filterData);
  }, [filterFavouritePokemon]);

  const sortPokemon = (sortParam: string) => {
    const deepClonePokemonFilterData = _.cloneDeep(pokemonFilterData);
    if (sortParam === "asc") {
      const sortedPokemon = deepClonePokemonFilterData.sort(
        (a: any, b: any) => a.id - b.id
      );
      setPokemonFilterData(sortedPokemon);
    }

    if (sortParam === "desc") {
      const sortedPokemon = deepClonePokemonFilterData.sort(
        (a: any, b: any) => b.id - a.id
      );
      setPokemonFilterData(sortedPokemon);
    }
  };

  return (
    <div className="pokemon__favourite">
      <h3>Favourite Pokemon</h3>
      <Accordion
        count={favouritePokemonList.length}
        pokemon={favouritePokemonList}
        setSelectValue={setSelectValue}
        selectValue={selectValue}
        sortPokemon={sortPokemon}
      />
      {localStorageData === "" && (
        <h3>Probably you don't have the favourite pokemon</h3>
      )}
      {!favouritePokemonList.length && localStorageData !== "" ? (
        <Loader />
      ) : null}
      <>
        <ul className="pokemon__favourite-list">
          {pokemonFilterData.map((pokemon: any) => (
            <PokemonTile
              pokemon={pokemon}
              onClick={() => {}}
              key={pokemon.id}
              setActiveSnackbar={setActiveSnackbar}
            />
          ))}
        </ul>
        {activeSnackbar[0]?.activeState && (
          <Snackbar
            text={activeSnackbar[0].text}
            variant={activeSnackbar[0].variant}
            activeSnackbar={setActiveSnackbar}
          />
        )}
      </>
    </div>
  );
};
