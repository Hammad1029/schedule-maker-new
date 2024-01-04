// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    slots: [],
    generationChecks: [],
    loading: false
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
        setLoading(state, action) {
            state.loading = action.payload
        }
    }
});

export default app.reducer;

export const { setAppData, setLoading } = app.actions;
