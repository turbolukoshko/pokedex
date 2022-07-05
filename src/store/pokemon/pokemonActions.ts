import { pokeapi } from "./../../api/index";
import axios from "axios";
import { Dispatch } from "react";
import { PokemonActions, PokemonActionTypes } from "./pokemonActionTypes";

export const getPokemonList = (limit: number = 20, offset: number = 0) => {
  return async (dispatch: Dispatch<PokemonActions>) => {
    try {
      dispatch(fetchPokemonList());

      // Get list of pokemon urls in format: results: [{name, url}]
      const getPokemonList = async () =>
        await axios.get(pokeapi(limit, offset));

      // Get a list of pokemon
      const getPokemon = async () => {
        const pokemonUrls = await getPokemonList();

        return pokemonUrls.data.results.map(async (item: any) => {
          const result = await axios.get(item.url);
          return result.data;
        });
      };

      // Get a promises with getPokemon function in format: [Promise]
      const promises = await getPokemon();

      // Get array with converted data from array of fulfilled promises
      const pokemon = await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  };
};

const fetchPokemonList = (): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST,
});

const fetchPokemonListSuccess = (payload: any): PokemonActions => ({
  type: PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS,
  payload,
});
