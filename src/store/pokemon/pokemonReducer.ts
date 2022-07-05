import {
  PokemonActions,
  PokemonActionTypes,
} from "../pokemon/pokemonActionTypes";
import { PokemonInitialState } from "./types";

const initialState: PokemonInitialState = {
  data: [],
  loading: false,
  error: null,
};

// TODO: add types

export const pokemonReducer = (
  state: PokemonInitialState = initialState,
  action: PokemonActions
) => {
  switch (action.type) {
    case PokemonActionTypes.FETCH_POKEMON_LIST:
      return { ...state, loading: true };

    case PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
};
