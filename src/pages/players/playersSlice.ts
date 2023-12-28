import { formatPlayers } from '@/utils/formatPlayer';
import type { player } from '@/utils/formatPlayer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type playersState = {
   loading: boolean;
   players: player[];
   error: null | string | undefined;
};

export const fetchPlayers = createAsyncThunk(
   'players/fetchPlayers',
   async () => {
      return fetch(`${import.meta.env.VITE_MOCKURL}players.json`, {
         //return fetch(`${import.meta.env.VITE_API}/players`, {
         method: 'get',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((result) => result.json())
         .then((data) => {
            return formatPlayers(data);
         });
   }
);

const initialState: playersState = {
   loading: false,
   players: [],
   error: null,
};

export const playersSlice = createSlice({
   name: 'players',
   initialState,
   reducers: {
      resetPlayers: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPlayers.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(fetchPlayers.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.players = action.payload;
         state.error = null;
      });
      builder.addCase(fetchPlayers.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.players = [];
         state.error = action.error.message;
      });
   },
});
