import {
  FilteredPokemonActions,
  FilteredPokemonActionsTypes,
} from "./filteredPokemonActionTypes";
import { PokemonData } from "../types";

export const initialState: PokemonData = {
  data: [],
  loading: false,
  error: null,
};

export const filterReducer = (
  state: PokemonData = initialState,
  action: FilteredPokemonActions
) => {
  switch (action.type) {
    case FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_BY_TYPE:
      return { ...state, loading: true };
    case FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_LIST:
      return { ...state, data: action.payload, loading: false };
    case FilteredPokemonActionsTypes.GET_SORTED_POKEMON_LIST:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
