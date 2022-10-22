import {
  FavouritePokemonState,
  FavouritePokemonActions,
  FavouritePokemonTypes,
} from "./favouritePokemonActionTypes";

const initialState = {
  favouritePokemonOrder: "",
};

export const favouritePokemonReducer = (
  state: FavouritePokemonState = initialState,
  action: FavouritePokemonActions
) => {
  switch (action.type) {
    case FavouritePokemonTypes.PASS_FAVOURITE_POKEMON_LIST:
      return { ...state, favouritePokemonOrder: action.payload };
    default:
      return state;
  }
};
