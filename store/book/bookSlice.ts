import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface BookState {
    name?: string
}

// Initial state
const initialState: BookState = {};

// Actual Slice
export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        // Action to set the authentication status
        setBook(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setBook } = bookSlice.actions;

export const selectBook = (state: AppState) => state.book;

export default bookSlice.reducer;
