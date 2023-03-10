import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export type BookState = {
    id: string;
    volumeInfo: {
        title: string;
        subtitle: string;
        description: string;
        authors: string[];
    }
} | null;

// Initial state
const initialState: BookState = null;

const name = "book";

// Actual Slice
export const bookSlice = createSlice<BookState, SliceCaseReducers<BookState>,typeof name>({
    name,
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
                ...action.payload[name],
            };
        },
    },
});

export const { setBook } = bookSlice.actions;

export const selectBook = (state: AppState) => state[name];

export default bookSlice.reducer;
