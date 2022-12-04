import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { contract: null, signer: null };

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setUserContract: (state: any, action: PayloadAction<any>) => {
      state.userContract = action.payload;
    },
    setBettingContract: (state: any, action: PayloadAction<any>) => {
      state.bettingContract = action.payload;
    },
    setLotteryContract: (state: any, action: PayloadAction<any>) => {
      state.lotteryContract = action.payload;
    },
    setNftContract: (state: any, action: PayloadAction<any>) => {
      state.nftContract = action.payload;
    },
    setSigner: (state: any, action: PayloadAction<any>) => {
      state.signer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserContract,
  setBettingContract,
  setLotteryContract,
  setNftContract,
  setSigner,
} = contractSlice.actions;

export default contractSlice.reducer;
