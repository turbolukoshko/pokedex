import { combineReducers } from "redux";
import { pokemonReducer } from "./../pokemon/pokemonReducer";
import { favouritePokemonReducer } from "../favouritePokemon/favouritePokemonReducer";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  favouritePokemon: favouritePokemonReducer,
});
