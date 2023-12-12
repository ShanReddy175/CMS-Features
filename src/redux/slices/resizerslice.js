import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    inset : ['auto', 'auto', 'auto' ,'auto'],  // Values - Top Right Bottom Left
    currentElement : null,
    currentColumn : null
}

export const resizerSlice = createSlice({
    name : 'ResizerStore',
    initialState,
    reducers : {
        showResizer : (state, action) => {
            const thisAction = action.payload;
            state.show = thisAction.show;
            state.inset = thisAction.inset;
            state.currentElement = thisAction.currentElement;
            state.currentColumn = thisAction.currentColumn;
        }
    }
})

export const { showResizer } = resizerSlice.actions;

export default resizerSlice.reducer;