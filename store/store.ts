import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { bookSlice } from "./book/bookSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            [bookSlice.name]: bookSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);