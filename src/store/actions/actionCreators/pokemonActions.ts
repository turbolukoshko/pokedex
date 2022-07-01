import {
  PokemonActions,
  PokemonActionTypes,
} from "./../actionTypes/pokemonActionTypes";
import { Dispatch } from "react";

export const getPokemonList = (limit: number = 20, offset: number = 0) => {
  return async (dispatch: Dispatch<PokemonActions>) => {
    try {
      dispatch({ type: PokemonActionTypes.FETCH_POKEMON_LIST });
    } catch (e) {
      console.log(e);
    }
  };
};
