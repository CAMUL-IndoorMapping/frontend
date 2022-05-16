/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigation-reducer";
import userReducer from './user-reducer'
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStoreDispatch() {
  return useDispatch<StoreDispatch>();
}

export function useStoreSelector<T>(
  selector: (state: StoreState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  return useSelector<StoreState, T>(selector, equalityFn);
}

export default store;
