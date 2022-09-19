import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MatchIF {
  date: number;
  matchId: number;
  team1: string;
  team2: string;
  statusCode: string;
  statusString: string;
}

const initialState: any = { lotteries: [], lottery: {}, participants: [] };

export const lotteriesSlice = createSlice({
  name: "lotteries",
  initialState,
  reducers: {
    setLotteries: (state: any, action: PayloadAction<any>) => {
      state.lotteries = action.payload;
    },
    setLottery: (state: any, action: PayloadAction<any>) => {
      state.lottery = action.payload;
    },
    setParticipants: (state: any, action: PayloadAction<any>) => {
      state.participants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLotteries, setLottery, setParticipants } =
  lotteriesSlice.actions;

export default lotteriesSlice.reducer;
