import { PokemonActionTypes } from "./../actions/actionTypes/pokemonActionTypes";
const initialState: any = {
  data: [],
  loading: false,
  error: null,
};

// TODO: add types

export const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PokemonActionTypes.FETCH_POKEMON_LIST:
      console.log("works");
      return { ...state, loading: true };
    default:
      return state;
  }
};
