import { Dispatch } from "react";
import { FavouritePokemonTypes } from "./favouritePokemonActionTypes";

export const getFavouritePokemonRegister =
  (data: string | null) => async (dispatch: Dispatch<any>) => {
    dispatch(passFavouritePokemonList(data));
  };

const passFavouritePokemonList = (data: string | null) => ({
  type: FavouritePokemonTypes.PASS_FAVOURITE_POKEMON_LIST,
  payload: data,
});
