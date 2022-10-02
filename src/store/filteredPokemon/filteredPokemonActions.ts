import {
  FilteredPokemonActions,
  FilteredPokemonActionsTypes,
} from "./filteredPokemonActionTypes";
import { Dispatch } from "react";

export const filteredPokemon = (type: string) => {
  return async (dispatch: Dispatch<FilteredPokemonActions>, getStore: any) => {
    const pokemon = getStore().pokemon.data;
    const deepClonedPokemon = JSON.parse(JSON.stringify(pokemon));

    dispatch(filteredPokemonByType());

    if (type === "all") {
      dispatch(filteredPokemonList(pokemon));
    } else {
      /* 
    pokemon data has types in the format [0: {type: { name: ... }}, 1: {type: { name: ... }}]
    2 variables are needed to sort these values
    */
      const filteredDataTypes0 = deepClonedPokemon.filter(
        (pokemon: any) => pokemon.types[0].type.name === type
      );

      const filteredDataTypes1 = deepClonedPokemon.filter(
        (pokemon: any) =>
          pokemon.types[1] && pokemon.types[1].type.name === type
      );

      const filterResult = [...filteredDataTypes0, ...filteredDataTypes1];

      dispatch(filteredPokemonList(filterResult));
    }
  };
};

const filteredPokemonByType = (): FilteredPokemonActions => ({
  type: FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_BY_TYPE,
});

const filteredPokemonList = (data: any): FilteredPokemonActions => ({
  type: FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_LIST,
  payload: data,
});
