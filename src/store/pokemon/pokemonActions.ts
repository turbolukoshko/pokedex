import { getPokemons } from "./../../api/index";
import axios from "axios";
import { Dispatch } from "react";
import { PokemonActions, PokemonActionTypes } from "./pokemonActionTypes";
import { PokemonItemData, PokemonPagination } from "./types";

export const getPokemonList = (limit: number = 20, offset: number = 0) => {
  return async (dispatch: Dispatch<PokemonActions>) => {
    try {
      dispatch(fetchPokemonList());

      // Get list of pokemon urls in format: results: [{name, url}]
      const getPokemonList = async () =>
        await axios.get(getPokemons(limit, offset));

      // Get a list of pokemon
      const getPokemon = async () => {
        const pokemonUrls = await getPokemonList();

        const { data } = pokemonUrls;
        const { count, next, previous } = data;

        const pokemonInfo = {
          count,
          next,
          previous,
        };

        dispatch(fetchPokemonListInfo(pokemonInfo));

        return data.results.map(async (item: PokemonItemData) => {
          const result = await axios.get(item.url);
          return result.data;
        });
      };

      // Get a promises with getPokemon function in format: [Promise]
      const promises = await getPokemon();

      // Get array with converted data from array of fulfilled promises
      const pokemon = await Promise.all(promises);
      dispatch(fetchPokemonListSuccess(pokemon));
    } catch (e) {
      dispatch(fetchPokemonListError((e as Error).message));
    }
  };
};

const fetchPokemonList = (): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST,
});

const fetchPokemonListInfo = (payload: PokemonPagination): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST_PAGINATION,
  payload,
});

// TODO: add types for the payload
const fetchPokemonListSuccess = (payload: any[]): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS,
  payload,
});

const fetchPokemonListError = (payload: string | null): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST_ERROR,
  payload,
});
