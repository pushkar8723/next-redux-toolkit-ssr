import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { listSlice } from "./list/listSlice";
import { createWrapper } from "next-redux-wrapper";
import { bookSlice } from "./book/bookSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [listSlice.name]: listSlice.reducer,
            [bookSlice.name]: bookSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);