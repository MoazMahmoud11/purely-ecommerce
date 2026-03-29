import { createSlice } from "@reduxjs/toolkit";


const initialState = {isMobileMenuOpen: false, theme: localStorage.getItem('theme') || 'light', }

const uiSlice = createSlice({
    name: 'ui-slice',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light' ;
            localStorage.setItem('theme',state.theme);
        }
    }

});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;