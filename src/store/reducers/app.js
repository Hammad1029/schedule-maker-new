// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    slots: [],
    generationChecks: []
};

// ==============================|| SLICE - MENU ||============================== //

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppData(state, action) {
            state.slots = action.payload.slots;
            state.generationChecks = action.payload.generationChecks;
        },
    }
});

export default app.reducer;

export const { setAppData } = app.actions;
