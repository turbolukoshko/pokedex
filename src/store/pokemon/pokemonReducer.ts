import {
  PokemonActions,
  PokemonActionTypes,
} from "../pokemon/pokemonActionTypes";
import { PokemonState } from "./types";

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

export const pokemonReducer = (
  state: PokemonState = initialState,
  action: PokemonActions
) => {
  switch (action.type) {
    case PokemonActionTypes.FETCH_POKEMON_LIST:
      return { ...state, loading: true };

    case PokemonActionTypes.FETCH_POKEMON_LIST_PAGINATION:
      return { ...state, ...action.payload };

    case PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case PokemonActionTypes.FETCH_POKEMON_LIST_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
