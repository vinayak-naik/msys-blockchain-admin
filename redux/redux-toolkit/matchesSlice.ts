import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { matches: [], match: {}, team1: {}, team2: {} };

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state: any, action: PayloadAction<any>) => {
      state.matches = action.payload;
    },
    setMatch: (state: any, action: PayloadAction<any>) => {
      state.match = action.payload;
    },
    setTeam1: (state: any, action: PayloadAction<any>) => {
      state.team1 = action.payload;
    },
    setTeam2: (state: any, action: PayloadAction<any>) => {
      state.team2 = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMatches, setMatch, setTeam1, setTeam2 } =
  matchesSlice.actions;

export default matchesSlice.reducer;
