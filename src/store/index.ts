import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

declare module "redux" {
  interface Dispatch<A extends Action = AnyAction> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
