import { configureStore } from "@reduxjs/toolkit";
import rulerReducer from './slices/rulerslice';
import resizerReducer from './slices/resizerslice';

export const store = configureStore({
    reducer :{
        // reducers are defined here
        ruler: rulerReducer,
        resizer: resizerReducer
    }
})