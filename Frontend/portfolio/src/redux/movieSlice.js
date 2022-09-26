import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  detail: [],
  trending: []

};

export const movieSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    GET_NOWPLAYING: (state, { payload }) => {
      state.nowPlaying = payload;
    }, 
    GET_TRENDING: (state, { payload }) => {
      state.trending = payload;
    }, 
    GET_DETAIL: (state, { payload }) => {
      state.detail = payload;
    }, 
    
   },
});

export const { 
  GET_NOWPLAYING,
  GET_DETAIL,
  GET_TRENDING
} = movieSlice.actions;

export default movieSlice.reducer;
