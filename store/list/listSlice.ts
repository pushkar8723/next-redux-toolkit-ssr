import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface ListState {
    items: {
        id: string;
        volumeInfo: {
            title: string;
            subtitle: string;
        }
    }[];
}

// Initial state
const initialState: ListState = {
    items: [],
};

const name = "list";

// Actual Slice
export const listSlice = createSlice<ListState, SliceCaseReducers<ListState>,typeof name>({
    name,
    initialState,
    reducers: {
        // Action to set the authentication status
        setList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: (builder) => {
        builder.addCase<typeof HYDRATE, PayloadAction<any, typeof HYDRATE>>(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload[name],
            };
        })
    },
});

export const { setList } = listSlice.actions;

export const selectList = (state: AppState) => state[name];

export default listSlice.reducer;
