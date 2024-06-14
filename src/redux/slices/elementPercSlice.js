import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: true,
    currentElement: null,
    currentColumn: null,
    event: undefined
}

export const elementPercentageSlice = createSlice({
    name: 'ElementPercentage',
    initialState,
    reducers: {
        showElementPercentage: (state, action) => {
            const thisAction = action.payload;
            state.show = thisAction.show;
            state.currentElement = thisAction.currentElement;
            state.currentColumn = thisAction.currentColumn;
            state.event = thisAction.event
        }
    }
})

export const { showElementPercentage } = elementPercentageSlice.actions;

export default elementPercentageSlice.reducer;