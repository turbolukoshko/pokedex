import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { pokemonReducer } from "./reducers/rootReducer";

declare module "redux" {
  interface Dispatch<A extends Action = AnyAction> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: [thunk],
});
